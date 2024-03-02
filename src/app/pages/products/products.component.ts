import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/services/products.service';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SearchPipe } from 'src/app/pipe/search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DataViewModule, RatingModule, MessagesModule, TagModule, FormsModule, ButtonModule, RouterLink, ToastModule, PaginatorModule, ProgressSpinnerModule,ScrollTopModule, SearchPipe],
  providers: [MessageService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  isLoading : boolean = true
  products!: Product[] ;

  constructor(private _ProductsService: ProductsService, private _cartService: CartService, private messageService: MessageService, private _wishlistService:WishlistService) { }

  first: any;
  rows: any;
  limit: any;
  nextPage: any;
  withListData : any[] = []


  ngOnInit(): void {
    this.getFeatureProduct(1)

    this._wishlistService.getWishList().subscribe({
      next: (data)=> {
        this.withListData = data.data.map((e:any) => e._id)

      }
    })
  }

  getFeatureProduct(event: any) {
    console.log(event);

    this._ProductsService.getProduct(event).subscribe({
      next: (data) => {
        console.log(data);
        this.products = data.data
        this.first = data.metadata.currentPage
        this.rows = data.metadata.numberOfPages
        this.limit = data.metadata.limit
        this.nextPage = data.metadata.nextPage
        this.isLoading = false
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  addToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: data => {
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
        this._cartService.cartNum.next(data.numOfCartItems)
        this.clearItem(id)
      },
      error: err => {
        console.log(err);
        this.messageService.add({ severity: 'erorr', summary: 'Erorr', detail: err.message });
      }
    })
  }


  onPageChange(event: any): void {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    const currentPage = this.first / this.rows + 1;
    this.getFeatureProduct(currentPage);
}


addToWishList(id: string) {
  this._wishlistService.addProductToWishList(id).subscribe({
    next: (data)=> {
      console.log(data);
      if(data.status == 'success') {
        this._wishlistService.numWishList.next(data.data.length)
        this.withListData = data.data
      }
    },
    error: (err)=> {
      console.log(err);
    }
  })
}


removeForWishList(id: string) {
  this._wishlistService.removeProductFromWishList(id).subscribe({
    next: (data)=> {
      if(data.status == 'success') {
        if(data.data.lenght > 0) {
          this._wishlistService.numWishList.next(data.data.length)
          this.withListData = data.data
        } else {
          this._wishlistService.numWishList.next('0')
          this.withListData = data.data
        }


      }
    },
    error: (err) => {
      console.log(err);

    }
  })
}


clearItem(id: string) {
  this._wishlistService.removeProductFromWishList(id).subscribe({
    next: (data) => {
      if (data.status == 'success') {
        this._wishlistService.getWishList().subscribe({
          next: (data) => {
            console.log(data);
            if(data.count > 0) {
              this.withListData = data.data.map((e:any) => e._id)
              this._wishlistService.numWishList.next(data.count)
            } else {
              this._wishlistService.numWishList.next('0')
              this.withListData =  []
            }
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    },
    error: (err) => {
      console.log(err);
    }
  })
}



}
