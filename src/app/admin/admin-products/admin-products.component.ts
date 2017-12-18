import { Observable } from 'rxjs/Observable';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$: Observable<Product[]>;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.productService.getAllProducts();
  }

}
