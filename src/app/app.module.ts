import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetComponent } from './pages/forget/forget.component';
import { StepsModule } from 'primeng/steps';
import { DataViewModule } from 'primeng/dataview';
import { MyTokenInterceptor } from './interceptor/my-token.interceptor';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ForgetComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StepsModule,
    DataViewModule,
    BadgeModule,
    DropdownModule,
    ButtonModule,
    ProgressSpinnerModule

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:MyTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
