import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _httpClient:HttpClient) { }

  numWishList : BehaviorSubject<any> = new BehaviorSubject(0)

  getWishList() : Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
  }

  addProductToWishList(id: string): Observable<any> {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {productId: id})
  }

  removeProductFromWishList(id: string) : Observable<any> {
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
  }
}
