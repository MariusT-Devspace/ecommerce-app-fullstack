import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
    private productsService:  ProductsService,
    private route: ActivatedRoute
    ) {}
  
  ngOnInit(): void {
    // Retrieve products from the database
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (!params.has('category')) {
        this.productsService.getProducts().subscribe({
          next: (response: Product[]) => this.products.set(response),
          error: (err: Error) => console.error("Could not retrieve products" + err.message),
          complete: () => console.log("All products have been retrieved")
        });
      } else {
        this.productsService.getProductsByCategory(Number(params.get('category'))!).subscribe({
          next: (response: Product[]) => {this.products.set(response); console.log(`Products: ${response}`);},
          error: (err: Error) => console.error("Could not retrieve products" + err.message),
          complete: () => console.log("All products have been retrieved")
        });
      }
    });
    
  }
}
