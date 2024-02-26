import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/internal/operators/map';
import { Category } from 'src/app/models/category.model';
import { ProductPOST } from 'src/app/models/productPOST.model';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.sass']
})
export class AddProductDialogComponent implements OnInit{
  @Output() onAddProduct = new EventEmitter<ProductPOST>();

  addProductForm: FormGroup = new FormGroup({});
  
  breakpoint$ = this.breakpointObserver.observe(Breakpoints.XSmall)
  .pipe(
    map(result => result.matches ? 'handset' : 'desktop')
  );

  constructor(public addProductDialogRef: MatDialogRef<AddProductDialogComponent>, 
    private formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: {categories: Category[]},
    private breakpointObserver: BreakpointObserver) {
      this.breakpoint$.subscribe({
        next: (v) => {
          if (v === 'desktop') {
            addProductDialogRef.updateSize('500px');
          } else {
            addProductDialogRef.updateSize('350px');
          }
        }
      });
    }

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
      const product: ProductPOST = {
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
