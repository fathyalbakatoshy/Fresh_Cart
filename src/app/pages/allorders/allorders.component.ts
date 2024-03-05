import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent {
  constructor(private _ordersService:OrdersService) {}
  orders!: any[]
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      let decoded: any = jwtDecode(token);
      this._ordersService.getAllOrders(decoded.id).subscribe({
        next: (data) => {
          console.log(data);
          this.orders = data
        },
        error: err => {
          console.log(err);

        }
      })
    }
  }

}
