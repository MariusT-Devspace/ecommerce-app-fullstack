import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.sass']
})
export class ProductDetailDialogComponent implements OnInit {
  productDetailForm: FormGroup = new FormGroup({});
  breakpoint$ = this.breakpointObserver.observe(Breakpoints.Handset)
              .pipe(
                map(result => result.matches ? 'handset' : 'desktop')
              );

  constructor(public productDetailDialogRef: MatDialogRef<ProductDetailDialogComponent>, 
    private formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver,
    @Inject(MAT_DIALOG_DATA) public data: {
      product: IProduct,
      categories: ICategory[]
    }) {}

  ngOnInit(): void {
    this.productDetailForm = this.formBuilder.group({
      title: new FormControl({value: '', disabled: true}, [Validators.required]),
      description: new FormControl({value: '', disabled: true}, [Validators.required]),
      price: new FormControl({value: '', disabled: true}, [Validators.pattern("^\d+\.\d{2}$")]),
      picture: new FormControl({value: '', disabled: true}, [Validators.required]),
      isAvailable: new FormControl({value: '', disabled: true}, [Validators.required]),
      categoryId: new FormControl({value: '', disabled: true}),
    });
  }
}
