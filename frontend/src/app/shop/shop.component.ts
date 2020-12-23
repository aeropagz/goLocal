import { Component, OnInit } from '@angular/core';
import { Farmer } from '../Farmer';

import { ProductsService } from "../products.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public farmers: Array<Farmer>;
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadFarmer();
    
  }
  loadFarmer(){
    this.productsService.getProductByFarmers()
      .subscribe((data : Array<Farmer>) => {
        this.farmers = data;
      });
  }
}
