import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/services/products.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _productsService:ProductsService) {}

  brands: any[] = []
  isLoading : boolean = true;


  ngOnInit(): void {
    this.getCategorios()
  }


  getCategorios() {
    this._productsService.getBrands().subscribe({
      next: (data)=> {
        console.log(data.data);

        this.brands = data.data
        this.isLoading = false
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }
}
