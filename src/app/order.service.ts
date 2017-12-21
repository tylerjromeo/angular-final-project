import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { Order } from './models/orders';
import { UserService } from './user.service';

@Injectable()
export class OrderService {

  constructor(private afDb: AngularFireDatabase,
    private userService: UserService,
    private cartService: ShoppingCartService) { }

  async placeOrder(order: Order) {
    const result = await this.afDb.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders(): Observable<Order[]> {
    return this.afDb.list('/orders');
  }

  getMyOrders(): Observable<Order[]> {
    return this.userService.getUserState().switchMap(user => {
      return this.getOrders().map(orders => {
        return orders.filter(o => o.userId === user.uid);
      });
    });
  }

}
