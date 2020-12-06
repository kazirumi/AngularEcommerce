import { Component, OnInit } from '@angular/core';
import { Product } from './shared/product.model';
import { ProductService } from './shared/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _searchTerm:string;

  constructor(private service:ProductService)
  {
   
  }






  searchTerm(value:string){
    console.log(value);
   
     this.service.filteredProduct=this.service.productList.filter(product=>product.Name.toLowerCase().indexOf(value.toLowerCase())!==-1);
  }

  filterProduct(searchString:string){
  
    
  }
  title = 'AngularEcommerceNew';

 
}
