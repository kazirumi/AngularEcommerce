import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  panelOpenState = false;
  searchKey:string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private service:ProductService,private router:Router) {

  
  }

  ngOnInit() {
    this.service.getproductType();
  }

      

  searchTerm(){
    
   console.log(this.searchKey)
     this.service.filteredProduct=this.service.productList.filter(product=>product.Name.toLowerCase().indexOf(this.searchKey.toLowerCase())!==-1);
     this.router.navigate(['/Product']);

  }

  SearchProductTypeWise(ProdTypeID:number){
    

    this.service.filteredProduct=this.service.productList.filter(product=>product.ProductTypeId==ProdTypeID);
    this.router.navigate(['/Product']);
  }
}
