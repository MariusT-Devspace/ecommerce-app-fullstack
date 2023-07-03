import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog.component';
import { ICategory } from 'src/app/models/category.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass']
})
export class ProductsListComponent {
  @Input() categories : ICategory[] = []

  breakpoint$ = this.breakpointObserver.observe(Breakpoints.Handset)
              .pipe(
                map(result => result.matches ? 'handset' : 'desktop')
              );

  _addProductDialogRef: MatDialogRef<AddProductDialogComponent> | undefined;
  _productDetailDialogRef: MatDialogRef<ProductDetailDialogComponent> | undefined;
  selectedProductId: number | undefined;

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) { 
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

    this._addProductDialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose,
      minWidth,
      data: {
        categories: this.categories
      }
    });
  }

  openProductDetailDialog(selectedProductId: number): void {
    this.selectedProductId = selectedProductId;
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

    this._productDetailDialogRef = this.dialog.open(ProductDetailDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose,
      minWidth,
      data: {
        productId: selectedProductId,
        categories: this.categories
      }
    });
  }

}