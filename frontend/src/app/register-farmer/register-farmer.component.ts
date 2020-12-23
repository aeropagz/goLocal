import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from '../account.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-register-farmer',
  templateUrl: './register-farmer.component.html',
  styleUrls: ['./register-farmer.component.scss']
})
export class RegisterFarmerComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  public selectedState: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountSerice: AccountService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      license: ['', Validators.required],
      location: ['', Validators.required]
    });
  }
  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.loading = true; 
    this.accountSerice.registerFarmer(this.form.value)
      .pipe(first())
      .subscribe({
        next: ()=> {
          
          this.alertService.success('Regristration successfull', {keepAfterRouteChange: true});
          this.router.navigateByUrl('/login');
        },
        error: error => {
          this.alertService.error(error.error, {autoClose: true});
          this.loading = false;
        }
      })
  }

}
