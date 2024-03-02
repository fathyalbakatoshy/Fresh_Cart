import { Component, OnInit, Renderer2 } from '@angular/core';
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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@Component({
  selector: 'app-feature-product',
  standalone: true,
  imports: [CommonModule, DataViewModule, RatingModule, MessagesModule, TagModule, FormsModule, ButtonModule, RouterLink,ToastModule,ProgressSpinnerModule],
  templateUrl: './feature-product.component.html',
  styleUrls: ['./feature-product.component.css'],
  providers: [MessageService]
})
export class FeatureProductComponent implements OnInit  {
  constructor(private _ProductsService:ProductsService,private messageService: MessageService, private _cartService:CartService, private _renderer2:Renderer2, private _wishlistService:WishlistService) {}
  withListData : any[] = []
  products: Product[] = []
  isHeartFilled: boolean = false
  isLoading : boolean = true


  ngOnInit(): void {
      this.getFeatureProduct()

      this._wishlistService.getWishList().subscribe({
        next: (data) => {
          this.withListData = data.data.map((e: any) => e._id)

        }
      })
  }

  getFeatureProduct() {
    this._ProductsService.getProduct().subscribe({
      next: (data)=> {
        this.products = data.data
        this.isLoading = false
      },
      error : (err)=> {
      }
    })
  }

  addToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: data => {
        this._cartService.cartNum.next(data.numOfCartItems)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message, });
        this.clearItem(id)
      },
      error: err => {
        this.messageService.add({ severity: 'erorr', summary: 'Erorr', detail: err.message, });
      }
    })
  }

  addToWishList(id: string) {
    this._wishlistService.addProductToWishList(id).subscribe({
      next: (data)=> {
        if(data.status == 'success') {
          this._wishlistService.numWishList.next(data.data.length)
          this.withListData = data.data
        }
      },
      error: (err)=> {
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
      }
    })
  }



  clearItem(id: string) {
    this._wishlistService.removeProductFromWishList(id).subscribe({
      next: (data) => {
        if (data.status == 'success') {
          this._wishlistService.getWishList().subscribe({
            next: (data) => {
              if (data.status == 'success') {
                if(data.count > 0) {
                  this._wishlistService.numWishList.next(data.count)
                } else {
                  this._wishlistService.numWishList.next('0')
                }
              }
            },
            error: (err) => {
            }
          })
        }
      },
      error: (err) => {
      }
    })
  }

}
