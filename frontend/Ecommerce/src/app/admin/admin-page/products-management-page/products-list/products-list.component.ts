import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog.component';
import { ICategory } from 'src/app/models/category.model';
import { IProductPOST } from 'src/app/models/productPOST.model';
import { IProductPUT } from 'src/app/models/productPUT.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass']
})
export class ProductsListComponent {
  @Input() categories: ICategory[] = []
  @Output() onGetProducts = new EventEmitter();
  @Output() onAddProduct = new EventEmitter<IProductPOST>();
  @Output() onUpdateProduct = new EventEmitter<IProductPUT>();

  breakpoint$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches ? 'handset' : 'desktop')
    );

  selectedProductId: number | undefined;

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {}

  getProducts() {
    this.onGetProducts.emit();
  }

  updateProduct(productPUT: IProductPUT) {
    this.onUpdateProduct.emit(productPUT);
  }

  openAddProductDialog(): void {
    let enterAnimationDuration = '300ms';
    let exitAnimationDuration = '150ms';
    let disableClose = true;
    let minWidth = 350;

    this.breakpoint$.subscribe({
      next: (v) => { 
        if (v === 'desktop')
          minWidth = 500;
      }
    });

    const addProductDialogRef = this.dialog.open(AddProductDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose,
      minWidth,
      data: {
        categories: this.categories
      }
    });

    addProductDialogRef.componentInstance.onAddProduct.subscribe({
      next: (result: IProductPOST) => { 
        this.onAddProduct.emit(result);
        this.dialog.closeAll();
      },
      error: (err: Error) => console.error(`Error submitting new product: ${err.message}`),
      complete: () => {}
    });
  }

  openProductDetailDialog(selectedProductId: number): void {
    this.selectedProductId = selectedProductId;
    let enterAnimationDuration = '300ms';
    let exitAnimationDuration = '150ms';
    let disableClose = true;
    let maxWidth = '85vw';

    const productDetailDialogRef = this.dialog.open(ProductDetailDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose,
      maxWidth,
      data: {
        productId: selectedProductId,
        categories: this.categories,
      }
    });

    productDetailDialogRef.componentInstance.onUpdateProduct.subscribe({
      next: (result: IProductPUT) => { 
        this.onUpdateProduct.emit(result);
        this.dialog.closeAll();
      },
      error: (err: Error) => console.error(`Error updating product: ${err.message}`),
      complete: () => {}
    });
  }

}