import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog.component';
import { Category } from 'src/app/models/category.model';
import { ProductPOST } from 'src/app/models/DTOs/product-post.model';
import { ProductPUT } from 'src/app/models/DTOs/product-put.model';
import { IconButton } from 'src/app/shared/icon-button/icon-button.model';
import { MaterialIcon } from 'src/app/shared/icon-button/material-icons.enum';
import { IconButtonType } from 'src/app/shared/icon-button/icon-button-type.enum';
import { ThemeColor } from 'src/app/constants';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass']
})
export class ProductsListComponent {
  @Input() categories: Category[] = []
  @Output() onGetProducts = new EventEmitter();
  @Output() onAddProduct = new EventEmitter<ProductPOST>();
  @Output() onUpdateProduct = new EventEmitter<ProductPUT>();

  breakpoint$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches ? 'handset' : 'desktop')
    );

  selectedProductId: number | undefined;

  newProductButton: IconButton = {
    icon: { iconName: 'add', svgIcon: MaterialIcon.ADD_FILL0_W400_GRAD0_SZ20 },
    matButtonType: IconButtonType.MAT_BUTTON,
    color: ThemeColor.PRIMARY
  }

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {}

  getProducts() {
    this.onGetProducts.emit();
  }

  updateProduct(productPUT: ProductPUT) {
    this.onUpdateProduct.emit(productPUT);
  }

  openAddProductDialog(): void {
    let enterAnimationDuration = '300ms';
    let exitAnimationDuration = '150ms';
    let disableClose = true;
    let maxWidth = '90vw';

    const addProductDialogRef = this.dialog.open(AddProductDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose,
      maxWidth,
      data: {
        categories: this.categories
      }
    });

    addProductDialogRef.componentInstance.onAddProduct.subscribe({
      next: (result: ProductPOST) => { 
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
    let maxWidth = '90vw';

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
      next: (result: ProductPUT) => { 
        this.onUpdateProduct.emit(result);
        this.dialog.closeAll();
      },
      error: (err: Error) => console.error(`Error updating product: ${err.message}`),
      complete: () => {}
    });
  }

}