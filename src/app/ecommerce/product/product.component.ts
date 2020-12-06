import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  constructor(private service:ProductService) { }

  ngOnInit() {
    this.service.getProductList();
    
    this.service.filteredProduct=this.service.productList;
  }

public getImage=(Image:string)=>{

  return `https://localhost:44386/${Image}`; 
}
}
