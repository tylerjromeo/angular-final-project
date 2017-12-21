import { Component, Input } from '@angular/core';
import { Order } from '../models/orders';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent {

  @Input()
  orders: Order[];

}
