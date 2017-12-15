import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.userService.getUserState().map(user => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    });
  }
}
