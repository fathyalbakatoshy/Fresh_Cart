import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _httpClient:HttpClient) { }

  getAllAdrress() :Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/addresses/`)
  }
  removeAdrress(id: string) :Observable<any> {
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`)
  }
  addAdrress(data : any) :Observable<any> {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/addresses/`, data)
  }
}
