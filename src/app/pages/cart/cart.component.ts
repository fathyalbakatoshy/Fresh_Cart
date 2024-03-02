import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router, RouterLink } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ButtonModule , ToastModule, RouterLink,SkeletonModule],
  templateUrl: './cart.component.html',
  providers: [MessageService],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _cartService:CartService, private messageService:MessageService) {}

  productId: string = ''
  products : any[] | null = []
  totalPrice : number = 0
  isLoading : boolean = true

ngOnInit(): void {
  this.getCart()
}

getCart() {
  this._cartService.getCartProduct().subscribe({
    next: (data)=> {
      if(data.numOfCartItems > 0) {

        this.products =data.data.products
        this.totalPrice = data.data.totalCartPrice
        this.productId = data.data._id

        this._cartService.cartNum.next(data.numOfCartItems)
      } else {
        this.products = null
      }
      this.isLoading = false
    },
    error: (err)=> {
      console.log(err);
      if(err.ok == false) {
        this.products = null
        this.isLoading = false
      }
    }
  })
}

removeAll() {
  this._cartService.removeAllCart().subscribe({
    next: data => {
      if(data.message == 'success') {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: " All Deleted"});
        this.products = null
        this._cartService.cartNum.next('0')
      }
    },
    error: err => {
      console.log(err);
    }
  })
}


removeItem(id: string) {
this._cartService.removeItemFromCart(id).subscribe({
  next: (data)=> {
    if(data.status == "success") {
      console.log(data);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Deleted"});
      this.products =data.data.products
      this.totalPrice = data.data.totalCartPrice
      this._cartService.cartNum.next(data.numOfCartItems)
      if(data.data.totalCartPrice == 0) {
        this.products = null
      }

      console.log("delete");
    }
  },
  error: (err)=> {
    console.log(err);
  }
})
}


changeCount(count : any, id: string) {
  console.log(count, id);
  this._cartService.changeCount(count, id).subscribe({
    next: (data)=> {
      console.log(data.data);
      this.products =data.data.products
      this.totalPrice = data.data.totalCartPrice

    },
    error: (err)=> {
      console.log(err);

    }
  })


}



}
