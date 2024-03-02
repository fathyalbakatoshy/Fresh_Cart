import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Details } from 'src/app/interfaces/details';
import { GalleriaModule, GalleriaResponsiveOptions } from 'primeng/galleria';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@Component({
  selector: 'app-detials',
  standalone: true,
  imports: [CommonModule, GalleriaModule, DataViewModule, RatingModule, MessagesModule, TagModule, FormsModule, ButtonModule, RouterLink, ToastModule,ProgressSpinnerModule],
  templateUrl: './detials.component.html',
  styleUrls: ['./detials.component.css'],
  providers: [MessageService]

})
export class DetialsComponent {
  responsiveOptions: GalleriaResponsiveOptions[] | undefined;
  constructor(private _ActivatedRoute: ActivatedRoute, private _productsService: ProductsService, private _cartService: CartService, private messageService: MessageService, private _wishlistService:WishlistService) { }
  details: any = {} as Details
  isLoading: boolean = true
  ngOnInit(): void {
    this.getDetailsPage()
  }

  getDetailsPage() {
    this._ActivatedRoute.paramMap.subscribe({
      next: data => {
        this._productsService.getDetails(data.get('id')).subscribe({
          next: (res: any) => {
            this.details = res.data;
            this.responsiveOptions = res.data.images
            this.isLoading = false
          },
          error: err => {
          }
        })
      },
      error: err => {
      }
    })
  }

  addToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message, });
        this._cartService.cartNum.next(data.numOfCartItems)
        this.clearItem(id)
      },
      error: err => {
        this.messageService.add({ severity: 'erorr', summary: 'Erorr', detail: err.message, });
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
                this._wishlistService.numWishList.next(data.count)
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
