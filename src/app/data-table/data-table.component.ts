import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
// import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import {Router} from '@angular/router';




@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  dataSource:MatTableDataSource<any>;

  /**
   *
   */
  constructor(private service: ProductService,private router:Router) {
    this.service.getProductList();
    this.dataSource = new MatTableDataSource(this.service.productList);
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Id', 'Name', 'price', 'Quantity', 'QuantityTypeID', 'Description', 'Image', 'IsAvailable', 'ProductColor', 'ProductTypeId', 'SpecialTagId', 'Actions'];

  ngOnInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  onEdit(row) {

    this.service.formData = {
      Id: row.Id,
      Name: row.Name,
      price: row.price,
      Quantity: row.Quantity,
      QuantityTypeID: row.QuantityTypeID,
      Description: row.Description,
      Image: row.Image,
      IsAvailable: row.IsAvailable,
      ProductColor: row.ProductColor,
      ProductTypeId: row.ProductTypeId,
      SpecialTagId: row.SpecialTagId


    }
    this.router.navigateByUrl("/ProductCRUD");

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
