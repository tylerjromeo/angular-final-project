import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private afDb: AngularFireDatabase) { }

  private async getCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.createCart();
      cartId = result.key;
      localStorage.setItem('cartId', cartId);
    }
    return cartId;
  }

  private getItem(cartId: String, productId: String) {
    return this.afDb.object('shopping-carts/' + cartId + '/items/' + productId);
  }

  createCart() {
    return this.afDb.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    const cartId = await this.getCartId();
    return this.afDb.object('/shopping-carts/' + cartId);
  }

  async addToCart(product: Product) {
    const cartId = await this.getCartId();
    const item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + 1 });
    });
  }

  async removeFromCart(product: Product) {
    const cartId = await this.getCartId();
    const item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      if (item && item.quantity > 1) {
        item$.update({ product: product, quantity: item.quantity - 1 });
      } else if (item && item.quantity === 1) {
        item$.remove();
      }
    });
  }
}
