import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { ICategory } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.sass']
})
export class AddProductDialogComponent implements OnInit{
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
      categoryId: new FormControl('')
    });

    
  }

  
}
