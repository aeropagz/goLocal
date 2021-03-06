import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";

import { User } from "./User";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User{
    return this.userSubject.value;
  }

  login(username: string, password: string){
    return this.http.post<User>('http://localhost:8080/user/login', {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }
  registerUser(user: User){
    return this.http.post('http://localhost:8080/user/register/customer', user);
  }
  registerFarmer(user: User){
    return this.http.post('http://localhost:8080/user/register/farmer', user);
  }
}
