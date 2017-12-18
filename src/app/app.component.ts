import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, router: Router) {
    userService.getUserState().subscribe(user => {
      if (user) {
        userService.saveUser({
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
        });

        const returnUrl = localStorage.getItem('returnUrl');
        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
