import { Product } from './../../models/product';
import { Observable } from 'rxjs/Observable';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  productsSubscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) { }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount);
  }

  reloadItems(params) {
    if (this.tableResource) {
      this.tableResource.query(params)
        .then(items => this.items = items);
    }
  }

  ngOnInit() {
    this.productsSubscription = this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  filter(query) {
    const filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;

    this.initializeTable(filteredProducts);
  }

}
