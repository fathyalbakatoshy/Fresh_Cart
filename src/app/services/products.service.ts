import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient:HttpClient) { }

  getProduct(num : any = 1) : Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${num}`)
  }

  getDetails(id : any) {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  getCategories(): Observable<any> {
    return this._httpClient.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  getBrands() : Observable<any> {
    return this._httpClient.get("https://ecommerce.routemisr.com/api/v1/brands")
  }


}
