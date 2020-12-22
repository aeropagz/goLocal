import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from "@angular/forms";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";

import { ProductsService } from "../products.service";
import { error } from '@angular/compiler/src/util';
import { requireCheckboxes } from '../validatorFuncs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  paymentOptions = [];
  deliveryOptions = [];

  constructor(private formBuilder: FormBuilder,
              private productsService: ProductsService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      manufactureDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      paymentOptions: this.formBuilder.group({
        cashOnDelivery: [false],
        paypal: [false],
      }),
      deliveryOptions: this.formBuilder.group({
        ship: [false],
        pickUp: [false],
      }),
    });
    this.form.controls['paymentOptions'].setValidators(requireCheckboxes());
    this.form.controls['deliveryOptions'].setValidators(requireCheckboxes());
  }

  get f(){ return this.form.controls; }

  onSubmit(): void {
    console.log("subbed");
    console.log(this.f.deliveryOptions.errors);
    
    
    this.submitted = true;
    if(this.form.invalid){
      console.log("not valid");
      
      return;
    }
    this.loading = true;
    this.productsService.createProduct(this.form.value)
      .pipe(first())
      .subscribe({
        next: ()=> {
          const returnUrl = '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.log(error);
          
          this.loading = false;
        }
      });
  }

  
}
