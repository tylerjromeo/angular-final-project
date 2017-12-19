import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private afDb: AngularFireDatabase) { }

  private async getCartId() {
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

  getCart(cartId: string) {
    return this.afDb.object('/shopping-carts/' + cartId);
  }



  async addToCart(product: Product) {
    const cartId = await this.getCartId();
    const item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + 1 });
    });
  }
}
