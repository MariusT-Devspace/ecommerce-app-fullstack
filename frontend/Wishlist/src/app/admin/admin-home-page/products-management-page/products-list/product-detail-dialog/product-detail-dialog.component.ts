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
      title: new FormControl({value: this.data.product.title, disabled: !this.isEditMode}, [Validators.required]),
      description: new FormControl({value: this.data.product.description, disabled: !this.isEditMode}, [Validators.required]),
      price: new FormControl({value: this.data.product.price, disabled: !this.isEditMode}, [Validators.pattern("^\d+\.\d{2}$")]),
      picture: new FormControl({value: this.data.product.picture, disabled: !this.isEditMode}, [Validators.required]),
      isAvailable: new FormControl(this.data.product.isAvailable, [Validators.required]),
      categoryId: new FormControl({value: this.data.product.categoryId, disabled: !this.isEditMode}, [Validators.required]),
    });
  }
}
