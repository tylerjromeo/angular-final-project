import { Product } from './models/product';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private afDb: AngularFireDatabase) { }

  getAllProducts(): Observable<Product[]> {
    return this.afDb.list('/products');
  }

}
