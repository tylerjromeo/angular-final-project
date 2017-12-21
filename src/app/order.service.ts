import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private afDb: AngularFireDatabase,
    private cartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.afDb.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

}
