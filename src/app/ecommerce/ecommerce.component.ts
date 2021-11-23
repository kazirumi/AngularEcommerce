import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {

  constructor(private service:ProductService) { }

  ngOnInit() {
    this.service.getFilterProductList();

    this.service.getUserProfile();
  }

}
