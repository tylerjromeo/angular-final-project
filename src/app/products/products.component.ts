import { ShoppingCart } from './../models/shopping-cart';
import { OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from './../models/category';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[];
  cart$: Observable<ShoppingCart>;
  categories$: Observable<Category[]>;
  selectedCategory: string;

  constructor(private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    this.categories$ = this.productService.getAllCategories();
    this.cart$ = await this.cartService.getCart();

    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAllProducts().switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    }).subscribe(params => {
      this.selectedCategory = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.selectedCategory) ?
      this.products.filter(p => p.category === this.selectedCategory) :
      this.products;
  }

}
