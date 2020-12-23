import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { ShopComponent } from './_components/shop/shop.component';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { RegisterComponent } from './_components/register/register.component';
import { RegisterFarmerComponent } from './_components/register-farmer/register-farmer.component';
import { RegisterCustomerComponent } from './_components/register-customer/register-customer.component';
import { CreateProductComponent } from './_components/create-product/create-product.component';
import { AlertComponent } from './_components/alert/alert.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShopComponent,
    RegisterComponent,
    RegisterFarmerComponent,
    RegisterCustomerComponent,
    CreateProductComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
