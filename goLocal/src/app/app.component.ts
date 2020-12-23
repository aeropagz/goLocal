import { Component } from '@angular/core';
import { AccountService } from './account.service';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'goLocal';
  user: User;

  constructor(private accountService: AccountService){
    this.accountService.user.subscribe(x=>this.user = x);
  }
}
