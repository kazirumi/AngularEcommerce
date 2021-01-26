import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNull } from 'util';
import { Product } from './shared/product.model';
import { ProductService } from './shared/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _searchTerm:string;

  constructor(private service:ProductService,private router:Router)
  {
    this.service.getProductList();
  }






  searchTerm(value:string){
    console.log(value);
   
     this.service.filteredProduct=this.service.productList.filter(product=>product.Name.toLowerCase().indexOf(value.toLowerCase())!==-1);
     this.router.navigate(['/Product']);

  }

  filterProduct(searchString:string){
  
    
  }
  title = 'AngularEcommerceNew';

 
}
