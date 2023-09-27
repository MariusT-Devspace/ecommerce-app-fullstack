import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products.service';
import { ICategory } from 'src/app/models/category.model';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.sass']
})
export class ProductDetailDialogComponent implements OnInit {
  productDetailForm: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  product: IProduct | undefined;
  isProductRetrieved: boolean = false;
  isLoading: boolean = true;

  constructor(public productDetailDialogRef: MatDialogRef<ProductDetailDialogComponent>, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      productId: number,
      categories: ICategory[],
      imgWidth: number
    }, private productsService: ProductsService) {
      this.productsService.getProductById(this.data.productId).subscribe({
        next: (response: IProduct) => { 
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
    }

  ngOnInit(): void {
    
  }

  enableEditMode(): void {
    this.isEditMode = true;
  }

  disableEditMode(): void {
    this.isEditMode = false;
  }

  saveProduct() {
  }
}
