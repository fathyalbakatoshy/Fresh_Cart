import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private _authService: AuthService, private _cartService: CartService, private _wishlistService:WishlistService) { }
  isLoggedIn: boolean = false
  cartNum: string = ""
  wishListNum: string = ''

  ngOnInit(): void {
    this._authService.userToken.subscribe({
      next: res => {
        if (this._authService.userToken.getValue()) {
          this.isLoggedIn = true

          this._cartService.getCartProduct().subscribe({
            next: (data) => {
              this.cartNum = data.numOfCartItems ? data.numOfCartItems : 0
            },
            error: (err) => {
            }
          })

          this._cartService.cartNum.subscribe({
            next: (data) => {
              this.cartNum = data
            }
          })

          this._wishlistService.getWishList().subscribe({
            next: (data)=> {
              this._wishlistService.numWishList.next(data.data.length)
            }
          })

          this._wishlistService.numWishList.subscribe({
            next: (data)=> {
              this.wishListNum = data
            },
            error: (err)=> {
            }
          })
        } else {
          this.isLoggedIn = false
        }
      },
      error: err => {
      }
    })
  }

  signOut() {
    this._authService.signOut()
  }
}
