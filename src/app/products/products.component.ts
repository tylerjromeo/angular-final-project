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
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[];
  cart;
  categories$: Observable<Category[]>;
  selectedCategory: string;

  cartSubscription: Subscription;

  constructor(private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    this.categories$ = this.productService.getAllCategories();

    this.productService.getAllProducts().switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    }).subscribe(params => {
      this.selectedCategory = params.get('category');

      this.filteredProducts = (this.selectedCategory) ?
        this.products.filter(p => p.category === this.selectedCategory) :
        this.products;
    });

    this.cartSubscription = (await this.cartService.getCart()).subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}
