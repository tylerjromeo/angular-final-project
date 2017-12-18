import { Product } from './models/product';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from './models/category';

@Injectable()
export class ProductService {

  constructor(private afDb: AngularFireDatabase) { }

  getAllProducts(): Observable<Product[]> {
    return this.afDb.list('/products', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  addProduct(product: Product) {
    return this.afDb.list('/products').push(product);
  }

  getAllCategories(): Observable<Category[]> {
    return this.afDb.list('/categories');
  }
}
