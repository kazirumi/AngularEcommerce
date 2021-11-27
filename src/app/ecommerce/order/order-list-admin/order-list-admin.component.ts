import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/shared/order.model';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';


@Component({
  selector: 'app-order-list-admin',
  templateUrl: './order-list-admin.component.html',
  styleUrls: ['./order-list-admin.component.css']
})
export class OrderListAdminComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Order>;
  dataSource: MatTableDataSource<any>;

  /**
   *
   */
  constructor(private service:ProductService) {
   
    this.service.getOrders();
    
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ID', 'Name', 'Address', 'PhoneNumber', 'Email', 'OrderDate',];

  ngOnInit() {
    //this.service.getOrders();
   
    
    this.dataSource = new MatTableDataSource(this.service.orderList);
    

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
