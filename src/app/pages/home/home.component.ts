import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureProductComponent } from "./components/feature-product/feature-product.component";
import { CarouselComponent } from './components/carousel/carousel.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CommonModule, FeatureProductComponent, CarouselComponent]
})
export class HomeComponent {

}
