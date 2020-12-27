import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from "./_services/auth-guard.service";
import { ShopComponent } from "./_components/shop/shop.component";
import { LoginComponent } from "./_components/login/login.component";
import { RegisterComponent } from './_components/register/register.component';
import { CreateProductComponent } from "./_components/create-product/create-product.component";
import { FarmerComponent } from './_components/farmer/farmer.component';

const routes: Routes = [
  {path: 'shop', component: ShopComponent, canActivate: [AuthGuardService]},
  {path: 'product', component: CreateProductComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'farmer/:id', component: FarmerComponent},
  {path: '',   redirectTo: '/shop', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
