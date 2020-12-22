import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";

import { Product } from "./product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = "http://localhost:8080/products"

  constructor(private http: HttpClient) { }

  createProduct(product: Product){
    return this.http.post(this.apiUrl , product);
  }

  getProductByFarmers(){
    return this.http.get(this.apiUrl);
  }
}
