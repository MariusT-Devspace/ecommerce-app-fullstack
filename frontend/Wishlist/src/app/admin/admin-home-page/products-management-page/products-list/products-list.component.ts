import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ICategory } from 'src/app/models/category.model';
import { IProduct } from 'src/app/models/product.model';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass']
})
export class ProductsListComponent implements OnInit {
  breakpoint$ = this.breakpointObserver.observe(Breakpoints.Handset)
              .pipe(
                map(result => result.matches ? 'handset' : 'desktop')
              );

  categories: ICategory[] = [];
  _addProductDialogRef: MatDialogRef<AddProductDialogComponent> | undefined;
  _productDetailDialogRef: MatDialogRef<ProductDetailDialogComponent> | undefined;
  selectedProduct: IProduct | undefined;

  constructor(private categoriesService: CategoriesService, 
    private breakpointObserver: BreakpointObserver, public dialog: MatDialog) { 
    }

  ngOnInit(): void {
    this.getCategories();
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

  openProductDetailDialog(selectedProduct: IProduct): void {
    this.selectedProduct = selectedProduct;
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
        product: selectedProduct,
        categories: this.categories
      }
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response: ICategory[]) => this.categories = response,
      error: (err: Error) => console.error("Error retrieving categories", err),
      complete: () => console.log("Categories retrieved successfuly")
    });
  }

}