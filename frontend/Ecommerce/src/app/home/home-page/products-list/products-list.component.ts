import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.sass',
})
export class ProductsListComponent implements OnInit{
  products: WritableSignal<Product[]> = signal([]);

  constructor(
    private productsService:  ProductsService
    ) {}
  
  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (response: Product[]) => {this.products.set(response); console.log(`Product: ${response}`);},
      error: (err: Error) => console.error("Could not retrieve product" + err.message),
      complete: () => console.log("All products have been retrieved")
    });
  }
}
