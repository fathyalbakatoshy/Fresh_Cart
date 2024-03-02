import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressService } from 'src/app/services/address.service';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user-address',
  standalone: true,
  imports: [CommonModule , ButtonModule, RouterLink, AccordionModule, InputTextModule],
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {
  constructor(private _addressService:AddressService) {}
  addressData : any | null = null


  ngOnInit(): void {
    this._addressService.getAllAdrress().subscribe({
      next: (data)=> {
        console.log(data);
        if(data.results > 0) {
          this.addressData = data.data
        } else {
          this.addressData = null
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  removeItem(id: string) {
    this._addressService.removeAdrress(id).subscribe({
      next: (data)=> {
        console.log(data);

        if(data.data.length > 0) {
          this.addressData = data.data
        } else {
          this.addressData = null
        }
      },
      error: (err)=> {
        console.log(err);

      }
    })
  }




}
