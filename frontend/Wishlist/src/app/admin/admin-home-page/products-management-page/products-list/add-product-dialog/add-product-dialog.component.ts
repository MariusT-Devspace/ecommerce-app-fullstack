import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { ICategory } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.sass']
})
export class AddProductDialogComponent implements OnInit{
  addProductForm: FormGroup = new FormGroup({});
  categories: ICategory[] = [];
  breakpoint$ = this.breakpointObserver.observe(Breakpoints.Handset)
              .pipe(
                map(result => result.matches ? 'handset' : 'desktop')
              );
  constructor(private formBuilder: FormBuilder, private productsService: ProductsService,
              private categoriesService: CategoriesService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.pattern("^\d+\.\d{2}$")]),
      picture: new FormControl('', [Validators.required]),
      isAvailable: new FormControl('', [Validators.required]),
      categoryId: new FormControl('')
    });

    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response: ICategory[]) => this.categories = response,
      error: (err: Error) => console.error("Error retrieving categories", err),
      complete: () => console.log("Categories retrieved successfuly")
    });
  }
}
