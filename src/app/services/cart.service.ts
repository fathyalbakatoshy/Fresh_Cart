import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _httpClient:HttpClient) { }

  cartNum: BehaviorSubject<any> = new BehaviorSubject(0)

  addProductToCart(id: any): Observable<any> {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: id })
  }

  getCartProduct() : Observable<any> {
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
  }

  removeAllCart() :Observable<any> {
    return this._httpClient.delete('https://ecommerce.routemisr.com/api/v1/cart')
  }

  removeItemFromCart(id:string):Observable<any> {
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }

  changeCount(count: any, id: string) : Observable<any> {
    return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {count: count})
  }
}
