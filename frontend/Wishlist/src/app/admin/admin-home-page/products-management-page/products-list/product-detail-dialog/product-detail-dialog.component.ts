import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(public productDetailDialogRef: MatDialogRef<ProductDetailDialogComponent>, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      product: IProduct,
      categories: ICategory[]
    }) {}

  ngOnInit(): void {
    this.productDetailForm = this.formBuilder.group({
      title: new FormControl(this.data.product.title, [Validators.required]),
      description: new FormControl(this.data.product.description, [Validators.required]),
      price: new FormControl(this.data.product.price, [Validators.pattern("^\d+\.\d{2}$")]),
      picture: new FormControl(this.data.product.picture, [Validators.required]),
      isAvailable: new FormControl(this.data.product.isAvailable, [Validators.required]),
      categoryId: new FormControl(this.data.product.categoryId, [Validators.required]),
    });
  }

  enableEditMode(): void {
    this.isEditMode = true;
  }
}
