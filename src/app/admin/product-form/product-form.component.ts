import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
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
  id;
  product = {};

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.categories$ = this.productService.getAllCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).take(1).subscribe(p => this.product = p);
    }
  }

  save(product: Product) {
    if (this.id) {
      this.productService.updateProduct(this.id, this.product).then(() => {
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.productService.addProduct(product).then(() => {
        this.router.navigate(['/admin/products']);
      });
    }

  }

}
