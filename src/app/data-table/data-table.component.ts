import { AfterViewInit, Component, OnInit, ViewChild, EventEmitter,Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
// import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import {Router} from '@angular/router';
import { UtilitiyService } from '../shared/utilitiy.service';





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
  constructor(private service: ProductService,private router:Router,private utilityService:UtilitiyService,private toastr:ToastrService) {
   
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['Id', 'Name', 'price', 'Quantity', 'QuantityTypeID', 'Description', 'Image', 'IsAvailable', 'ProductColor', 'ProductTypeId', 'SpecialTagId', 'Actions'];
  displayedColumns = [ 'Name',  'Quantity', 'QuantityTypeID', 'Description', 'Image', 'IsAvailable', 'ProductColor', 'ProductTypeId', 'price', 'Actions'];
  ngOnInit() {
    this.service.getProductList();
    this.dataSource = new MatTableDataSource(this.service.productList);
    console.log(this.dataSource)
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
  onDelete(Id:number){
    if(confirm("Are You Sure Deleting this Record?"))
    this.service.deleteProduct(Id).subscribe(
      (res:any)=>{
        this.toastr.warning("Product Deleted","Delete Product");
        this.service.getProductList();
        this.dataSource=new MatTableDataSource(this.service.productList);
      },
      (err)=>{
        console.log(err);
      }
    );

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

import { Pipe, PipeTransform } from "@angular/core";
import { QuantityType } from '../shared/quantity-type.model';
import { ToastrService } from 'ngx-toastr';

@Pipe({
  name: 'ProductTypeData'
})
export class ProductTypePipe implements PipeTransform {

  constructor(private service:ProductService){

  }
  transform(value: number): string {
    var data =  this.service.productTypeList.filter(
          element => element.ID === value );
          return  data[0].ProductTypeName; 
  }
}


@Pipe({
  name:'QuantityTypeData'
})

export class QuantityTypePipe implements PipeTransform{

  constructor(private service:ProductService){

  }
  transform(value: number): string {
    var data =  this.service.quantityTypeList.filter(
          element => element.ID === value );
          return  data[0].QuantityTypeName; 
  }
}
