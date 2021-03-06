import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";

import { AccountService } from "../account.service";
import { AlertService } from "../alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
    });
  }
  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;

    if(this.form.invalid){
      return;
    }
    this.loading = true;
    this.accountService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = '/shop';
          this.alertService.success('Login Success', {keepAfterRouteChange: true});
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.alertService.error(error.error);
          this.loading = false;
        }
      });
  }
}
