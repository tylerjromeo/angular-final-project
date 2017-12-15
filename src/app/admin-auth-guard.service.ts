import { UserService } from './user.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private userService: UserService) { }

  canActivate() {
    return this.userService.getCurrentUser().map(user => {
      return user.isAdmin;
    });
  }
}
