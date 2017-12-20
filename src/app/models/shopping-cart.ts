import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';
export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    for (const productId in this.itemsMap) {
      if (this.itemsMap.hasOwnProperty(productId)) {
        const item = itemsMap[productId];
        const x = new ShoppingCartItem();
        Object.assign(x, item);
        x.$key = productId;
        this.items.push(x);
      }
    }
  }

  get totalItemsCount() {
    let count = 0;
    for (const item of this.items) {
      count += item.quantity;
    }
    return count;
  }

  get totalPrice() {
    let price = 0;
    for (const item of this.items) {
      price += item.totalPrice;
    }
    return price;
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.$key];
    return (item) ? item.quantity : 0;
  }
}
