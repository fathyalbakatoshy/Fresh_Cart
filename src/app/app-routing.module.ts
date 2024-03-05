import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { registerGuard } from './guard/register.guard';
import { ForgetComponent } from './pages/forget/forget.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', canActivate: [authGuard], loadComponent: ()=> import('./pages/home/home.component').then((m)=> m.HomeComponent), title:'Home'},
  {path: 'cart', canActivate: [authGuard],loadComponent: ()=> import('./pages/cart/cart.component').then((m)=> m.CartComponent), title: 'Cart'},
  {path: 'products',canActivate: [authGuard], loadComponent: ()=> import('./pages/products/products.component').then((m)=> m.ProductsComponent), title: 'Products'},
  {path: 'categories',canActivate: [authGuard], loadComponent: ()=> import('./pages/categories/categories.component').then((m)=> m.CategoriesComponent), title: 'Categories'},
  {path: 'brands',canActivate: [authGuard], loadComponent: ()=> import('./pages/brands/brands.component').then((m)=> m.BrandsComponent), title: 'Brands'},
  {path: 'wishlist', canActivate: [authGuard], loadComponent: ()=> import('./pages/wish-list/wish-list.component').then((m)=> m.WishListComponent), title:'WishList'},
  {path: 'address', canActivate: [authGuard], loadComponent: () => import("./pages/user-address/user-address.component").then((m) => m.UserAddressComponent), title: 'Address'},
  {path: 'setAddress', canActivate: [authGuard], loadComponent: ()=> import('./pages/set-address/set-address.component').then((m)=> m.SetAddressComponent), title: 'Address'},
  {path: 'register',canActivate: [registerGuard], loadComponent: ()=> import('./pages/register/register.component').then((m)=> m.RegisterComponent), title: 'Register'},
  {path: 'login',canActivate: [registerGuard], loadComponent: ()=> import('./pages/login/login.component').then((m)=> m.LoginComponent), title: 'Login'},
  {path: 'details/:id',canActivate: [authGuard], loadComponent: ()=> import('./pages/detials/detials.component').then((m)=> m.DetialsComponent), title: "Details"},
  {path: 'orders/:id',canActivate: [authGuard], loadComponent: ()=> import('./pages/orders/orders.component').then((m)=> m.OrdersComponent), title:"Orders"},
  {path: 'profile', canActivate:[authGuard], loadComponent: ()=> import("./pages/porfile/porfile.component").then((m) => m.PorfileComponent), title:"Profile"},
  {path: 'changePassword', canActivate: [authGuard], loadComponent: () => import('./pages/change-password/change-password.component').then((m) => m.ChangePasswordComponent), title: 'Setting'},
  {path: 'allorders', canActivate: [authGuard], loadComponent: ()=> import('./pages/allorders/allorders.component').then((m) => m.AllordersComponent), title: 'All Orders'},
  {path: 'updata', canActivate: [authGuard] , loadComponent: ()=> import("./pages/updata/updata.component").then((m) => m.UpdataComponent)},
  {path: 'forget',canActivate: [registerGuard],component:ForgetComponent ,children: [
    {path: '', redirectTo: 'forgetPassword', pathMatch:'full'},
    {path: 'forgetPassword', loadComponent: ()=> import('./pages/forget/components/forget-password/forget-password.component').then((m)=> m.ForgetPasswordComponent),title: "Reset Password"},
    {path: 'verifyPassword', loadComponent: ()=> import('./pages/forget/components/verify-password/verify-password.component').then((m)=> m.VerifyPasswordComponent),title: "Reset Password"},
    {path: 'resetPassword', loadComponent: ()=> import('./pages/forget/components/reset-password/reset-password.component').then((m)=> m.ResetPasswordComponent),title: "Reset Password"},
  ]},










  {path: '**', loadComponent: ()=> import('./pages/not-found/not-found.component').then((m)=> m.NotFoundComponent), title:"Not Found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
