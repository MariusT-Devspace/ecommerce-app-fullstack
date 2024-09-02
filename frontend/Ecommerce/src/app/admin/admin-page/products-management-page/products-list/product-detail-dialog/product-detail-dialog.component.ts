import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProductsService } from 'src/app/core/services/products.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { BehaviorSubject, map } from 'rxjs';
import { ProductPUT } from 'src/app/models/DTOs/product-put.model';
import { IconButton } from 'src/app/shared/icon-button/icon-button.model';
import { MaterialIcon } from 'src/app/shared/icon-button/material-icons.enum';
import { IconButtonType } from 'src/app/shared/icon-button/icon-button-type.enum';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.sass']
})
export class ProductDetailDialogComponent {
  @Output() onUpdateProduct = new EventEmitter<ProductPUT>();

  productDetailForm: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  product: Product | undefined;
  isProductRetrieved: boolean = false;
  isLoading: boolean = true;
  categoryName: string | undefined

  breakpoint$ = this.breakpointObserver.observe(Breakpoints.XSmall)
              .pipe(
                map(result => result.matches ? 'handset' : 'desktop')
              );

  pictureWidth = new BehaviorSubject<Number>(0)

  // Buttons
  editButton: IconButton = {
    icon: {iconName: 'edit',  svgIcon: MaterialIcon.EDIT_FILL0_W300_GRAD0_SZ20},
    matButtonType: IconButtonType.MAT_ICON_BUTTON,
    color: undefined
  }

  constructor(
    public productDetailDialogRef: MatDialogRef<ProductDetailDialogComponent>, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      productId: number,
      categories: Category[]
    }, 
    private productsService: ProductsService, 
    private breakpointObserver: BreakpointObserver
  ) {
    this.productsService.getProductById(this.data.productId).subscribe({
      next: (response: Product) => { 
        this.product = response;
        this.isProductRetrieved = true;

        this.productDetailForm = this.formBuilder.group({
          title: new FormControl(this.product.title , [Validators.required]),
          description: new FormControl(this.product.description, [Validators.required]),
          price: new FormControl(this.product.price, [Validators.pattern("^\d+\.\d{2}$")]),
          picture: new FormControl(this.product.picture, [Validators.required]),
          isAvailable: new FormControl(this.product.isAvailable, [Validators.required]),
          categoryId: new FormControl(this.product.categoryId, [Validators.required]),
        });

        this.categoryName = data.categories.find(category => category.id == this.product?.categoryId) 
                        ? data.categories.find(category => category.id == this.product?.categoryId)?.name 
                        : "None";

      },
      error: (err: Error) => {
        this.isLoading = false;
        console.error("Could not retrieve product: ", err);

      },
      complete: () => { 
        this.isLoading = false;
        console.log("Finished retrieving product");
      }
    });

    this.breakpoint$.subscribe({
      next: (v) => {
        if (v === 'desktop') {
          productDetailDialogRef.updateSize('500px');
          this.pictureWidth.next(250);
        } else {
          productDetailDialogRef.updateSize('350px');
          this.pictureWidth.next(150);
        }
      }
    });
  }

  enableEditMode(): void {
    this.isEditMode = true;
  }

  disableEditMode(): void {
    this.isEditMode = false;
  }

  updateProduct() {
    const productPUT: ProductPUT = {
      id: this.product!.id, 
      ...this.productDetailForm.value
    }
    this.onUpdateProduct.emit(productPUT);
  }
}
