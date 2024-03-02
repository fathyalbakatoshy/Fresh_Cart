import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/services/products.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule,ProgressSpinnerModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _productsService:ProductsService) {}

  categories: any[] = []
  isLoading : boolean = true


  ngOnInit(): void {
    this.getCategorios()
  }


  getCategorios() {
    this._productsService.getCategories().subscribe({
      next: (data)=> {
        console.log(data.data);

        this.categories = data.data
        this.isLoading = false
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }
}
