import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products.service';
import { ICategory } from 'src/app/models/category.model';
import { IProductPOST } from 'src/app/models/productPOST.model';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.sass']
})
export class AddProductDialogComponent implements OnInit{
  @Output() onAddProduct = new EventEmitter<IProductPOST>();

  addProductForm: FormGroup = new FormGroup({});
  
  constructor(public addProductDialogRef: MatDialogRef<AddProductDialogComponent>, private formBuilder: FormBuilder, private productsService: ProductsService,
              @Inject(MAT_DIALOG_DATA) public data: {categories: ICategory[]}) { }

  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.pattern("^\d+\.\d{2}$")]),
      picture: new FormControl('', [Validators.required]),
      isAvailable: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    });

  }

  submitProduct() {
      const product: IProductPOST = {
        title: this.addProductForm.value.title,
        description: this.addProductForm.value.description,
        price: this.addProductForm.value.price,
        picture: this.addProductForm.value.picture,
        isAvailable: this.addProductForm.value.isAvailable,
        categoryId: this.addProductForm.value.category
      }

      console.log("isAvailable: " + this.addProductForm.value.isAvailable)
      this.onAddProduct.emit(product);
  }
}
