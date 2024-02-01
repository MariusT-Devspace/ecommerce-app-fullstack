import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ProductsService } from 'src/app/core/services/products.service';
import { IProduct } from 'src/app/models/product.model';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.sass',
})
export class ProductsListComponent implements OnInit{
  products: WritableSignal<IProduct[]> = signal([]);
  
  breakpoint$ = this.breakpointObserver.observe('(max-width: 590px)')
  .pipe(
    map(result => result.matches ? 'handset' : 'desktop')
  );

  colsNum: WritableSignal<number> = signal(this.getColsNum());

  constructor(
    private productsService:  ProductsService,
    private breakpointObserver: BreakpointObserver
    ) {}
  
  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (response: IProduct[]) => {this.products.set(response); console.log(`Product: ${response}`);},
      error: (err: Error) => console.error("Could not retrieve product" + err.message),
      complete: () => console.log("All products have been retrieved")
    });

    fromEvent(window, 'resize').subscribe({
      next: () => {
        this.colsNum.set(this.getColsNum());
      }
    });
  }

  getColsNum(): number {
    return this.breakpointObserver.isMatched('(min-width: 602px)')
            ? 2
            : this.breakpointObserver.isMatched('(min-width: 960px)')
            ? 3
            : 1
  }
}
