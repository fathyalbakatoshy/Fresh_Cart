import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
products!: any[];
responsiveOptions: CarouselResponsiveOptions[]|undefined;

}
