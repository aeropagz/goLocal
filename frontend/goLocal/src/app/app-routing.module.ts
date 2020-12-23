import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from "./auth-guard.service";
import { ShopComponent } from "./shop/shop.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { CreateProductComponent } from "./create-product/create-product.component";

const routes: Routes = [
  {path: 'shop', component: ShopComponent, canActivate: [AuthGuardService]},
  {path: 'product', component: CreateProductComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '',   redirectTo: '/shop', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
