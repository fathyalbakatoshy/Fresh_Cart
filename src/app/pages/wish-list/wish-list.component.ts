import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/services/wishlist.service';
import { DataViewModule } from 'primeng/dataview';
import { MessageService } from 'primeng/api';
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CartService } from 'src/app/services/cart.service';
import { SkeletonModule } from 'primeng/skeleton';



@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, GalleriaModule, DataViewModule, RatingModule, MessagesModule, TagModule, FormsModule, ButtonModule, RouterLink, ToastModule,SkeletonModule],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
  providers: [MessageService]

})
export class WishListComponent implements OnInit {
  constructor(private _wishlistService: WishlistService, private _cartService: CartService, private messageService: MessageService) { }

  products: any | null = []
  isLoading : boolean = true


  ngOnInit(): void {
    this._wishlistService.getWishList().subscribe({
      next: (data) => {
        console.log(data);

        if (data.status == 'success') {
          if (data.count > 0) {
            this.products = data.data
            this._wishlistService.numWishList.next(data.count)
          } else {
            this.products = null
            this._wishlistService.numWishList.next(0)
          }
        } else {
        }
        this.isLoading = false
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
              if (data.status == 'success') {
                if (data.count > 0) {
                  this.products = data.data
                  this._wishlistService.numWishList.next(data.count)
                } else {
                  this.products = null
                  this._wishlistService.numWishList.next('0')
                }
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

  addToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: data => {
        console.log(data);
        this.clearItem(id)
        this._cartService.cartNum.next(data.numOfCartItems)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message, });

      },
      error: err => {
        console.log(err);
        this.messageService.add({ severity: 'erorr', summary: 'Erorr', detail: err.message, });
      }
    })
  }

}
