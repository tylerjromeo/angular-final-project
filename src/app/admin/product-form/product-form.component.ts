import { ProductService } from './../../product.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.categories$ = this.productService.getAllCategories();
  }

  save(product: Product, form?: FormGroup) {
    this.productService.addProduct(product).then(() => {
      form.reset();
    });
  }

}
