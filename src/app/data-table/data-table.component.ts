import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
//import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';




@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  dataSource;

  /**
   *
   */
  constructor(private service:ProductService) {
    
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Id', 'Name','price', 'Quantity', 'QuantityTypeID', 'Description', 'Image', 'IsAvailable', 'ProductColor', 'ProductTypeId', 'SpecialTagId'];

  ngOnInit() {
    this.service.getProductList()
    this.dataSource = new MatTableDataSource(this.service.productList);
  }

  applyFilter(event:Event){
    const filterValue =(event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
