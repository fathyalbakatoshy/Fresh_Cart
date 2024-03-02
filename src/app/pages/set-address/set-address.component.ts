import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-set-address',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, FormsModule, ButtonModule, PasswordModule, MessagesModule],
  templateUrl: './set-address.component.html',
  styleUrls: ['./set-address.component.css']
})
export class SetAddressComponent {

  constructor(private _addressService:AddressService, private _router:Router) {}

  mesError: any[] = [];
  isLoading: boolean = false
  notMatch: string = ''

  addressForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(18), Validators.minLength(4)]),
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)]),
    city: new FormControl(null, Validators.required),
  })


  address(form: FormGroup) {
    this.mesError = []
    this.markAllControlsTouched(form)
    if (form.valid&& !this.isLoading) {
      this.isLoading = true
      this._addressService.addAdrress(form.value).subscribe({
        next: (data) => {
          if(data.status == 'success') {
            this._router.navigate(['/address'])
          }
        },
        error: (err) => {
          console.log(err);
        }
      })

    }
  }



    markAllControlsTouched(form: FormGroup) {
      Object.values(form.controls).forEach((control: any) => {
        control.markAllAsTouched()
        if (control.controls) {
          this.markAllControlsTouched(control)
        }
      })
    }
}
