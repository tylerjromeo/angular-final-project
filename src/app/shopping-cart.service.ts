import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from './models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private afDb: AngularFireDatabase) { }

  createCart() {
    return this.afDb.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getCartId();
    return this.afDb.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getCartId();
    return this.afDb.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getCartId();
    const item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      const newQuantity = (item.quantity || 0) + change;
      if (newQuantity > 0) {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: newQuantity
        });
      } else {
        item$.remove();
      }
    });
  }

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
}
