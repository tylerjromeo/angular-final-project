import { Router } from '@angular/router';
import { OrderService } from './../order.service';
import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../models/orders';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input()
  cart: ShoppingCart;
  shipping = {};
  userId: string;
  userSubscription: Subscription;
  constructor(private userService: UserService,
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.userService.getUserState().subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
