import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: User;
  cart$: Observable<ShoppingCart>;

  constructor(private userService: UserService,
    private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => this.user = user);
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.userService.logout();
  }

}
