import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { registerGuard } from './guard/register.guard';
import { ForgetComponent } from './pages/forget/forget.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', canActivate: [authGuard], loadComponent: ()=> import('./pages/home/home.component').then((m)=> m.HomeComponent)},
  {path: 'cart', canActivate: [authGuard],loadComponent: ()=> import('./pages/cart/cart.component').then((m)=> m.CartComponent)},
  {path: 'products',canActivate: [authGuard], loadComponent: ()=> import('./pages/products/products.component').then((m)=> m.ProductsComponent)},
  {path: 'categories',canActivate: [authGuard], loadComponent: ()=> import('./pages/categories/categories.component').then((m)=> m.CategoriesComponent)},
  {path: 'brands',canActivate: [authGuard], loadComponent: ()=> import('./pages/brands/brands.component').then((m)=> m.BrandsComponent)},
  {path: 'wishlist', canActivate: [authGuard], loadComponent: ()=> import('./pages/wish-list/wish-list.component').then((m)=> m.WishListComponent)},
  {path: 'address', canActivate: [authGuard], loadComponent: () => import("./pages/user-address/user-address.component").then((m) => m.UserAddressComponent)},
  {path: 'setAddress', canActivate: [authGuard], loadComponent: ()=> import('./pages/set-address/set-address.component').then((m)=> m.SetAddressComponent)},
  {path: 'register',canActivate: [registerGuard], loadComponent: ()=> import('./pages/register/register.component').then((m)=> m.RegisterComponent)},
  {path: 'login',canActivate: [registerGuard], loadComponent: ()=> import('./pages/login/login.component').then((m)=> m.LoginComponent)},
  {path: 'details/:id',canActivate: [authGuard], loadComponent: ()=> import('./pages/detials/detials.component').then((m)=> m.DetialsComponent), title: "Details"},
  {path: 'orders/:id',canActivate: [authGuard], loadComponent: ()=> import('./pages/orders/orders.component').then((m)=> m.OrdersComponent)},
  {path: 'profile', canActivate:[authGuard], loadComponent: ()=> import("./pages/porfile/porfile.component").then((m) => m.PorfileComponent)},
  {path: 'changePassword', canActivate: [authGuard], loadComponent: () => import('./pages/change-password/change-password.component').then((m) => m.ChangePasswordComponent)},
  {path: 'updata', canActivate: [authGuard] , loadComponent: ()=> import("./pages/updata/updata.component").then((m) => m.UpdataComponent)},
  {path: 'forget',canActivate: [registerGuard],component:ForgetComponent ,children: [
    {path: '', redirectTo: 'forgetPassword', pathMatch:'full'},
    {path: 'forgetPassword', loadComponent: ()=> import('./pages/forget/components/forget-password/forget-password.component').then((m)=> m.ForgetPasswordComponent)},
    {path: 'verifyPassword', loadComponent: ()=> import('./pages/forget/components/verify-password/verify-password.component').then((m)=> m.VerifyPasswordComponent)},
    {path: 'resetPassword', loadComponent: ()=> import('./pages/forget/components/reset-password/reset-password.component').then((m)=> m.ResetPasswordComponent)},
  ]},










  {path: '**', loadComponent: ()=> import('./pages/not-found/not-found.component').then((m)=> m.NotFoundComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
