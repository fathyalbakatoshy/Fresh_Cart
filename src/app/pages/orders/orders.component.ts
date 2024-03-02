import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  constructor(private _ordersService: OrdersService, private _activatedRoute: ActivatedRoute) { }


  isLoading: boolean = false
  id: string = ''

  ordersForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required, Validators.maxLength(25), Validators.minLength(4)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)]),
    city: new FormControl(null, [Validators.required, Validators.maxLength(25), Validators.minLength(4)]),
  })





  orders(form: FormGroup) {
    this.markAllControlsTouched(form)
    if (form.valid && !this.isLoading) {
      this._activatedRoute.paramMap.subscribe({
        next: (data) => {
          this._ordersService.makeOrder(form.value, data.get("id")).subscribe({
            next: (data) => {
              console.log(data);
              window.open(data.session.url)
            },
            error: (err) => {
              console.log(err);
            }
          })
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
