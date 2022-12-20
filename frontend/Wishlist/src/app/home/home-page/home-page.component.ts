import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product.model';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService){ }

  ngOnInit(){
    this.productsService.getProducts().subscribe({
      next: (response: Product[]) => {this.products = response; console.log(`Product: ${response}`);},
      error: (err: Error) => console.error("Could not retrieve product" + err.message),
      complete: () => console.log("All products have been retrieved")
    });
  }
}
