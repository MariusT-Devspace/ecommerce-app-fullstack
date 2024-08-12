import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteCategoryDialogComponent } from './categories-list/confirm-delete-category-dialog/confirm-delete-category-dialog.component';
import { ProductPOST } from 'src/app/models/DTOs/product-post.model';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product.model';
import { ProductPUT } from 'src/app/models/DTOs/product-put.model';
import { CategoryRequestPOST } from 'src/app/models/DTOs/category-request-post.model';
import { CategoryRequestPUT } from 'src/app/models/DTOs/category-request-put.model';

@Component({
  selector: 'app-products-management-page',
  templateUrl: './products-management-page.component.html',
  styleUrls: ['./products-management-page.component.sass']
})
export class ProductsManagementPageComponent implements OnInit{
  categories : Category[] = []  
  @ViewChild(CategoriesListComponent) categoriesListCardComponent!: CategoriesListComponent;

  constructor (
    private categoriesService : CategoriesService, 
    private productsService: ProductsService, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response: Category[]) => this.categories = response,
      error: (err: Error) => console.error("Error retrieving categories", err),
      complete: () => console.log("Categories retrieved successfuly")
    });
  }

  addCategory(category: CategoryRequestPOST) {
    this.categoriesService.addCategory(category).subscribe({
      next: (response: any) => {
        this.categoriesListCardComponent.toggleAddCategory();
        this.getCategories();
      },
      error: (err: Error) => console.error(`Error submitting category: ${err.message}`),
      complete: () => console.log("Category added successfuly")
    });
  }

  editCategory(category: CategoryRequestPUT) {
    this.categoriesService.editCategory(category).subscribe({
      next: (response: any) => { 
        this.categoriesListCardComponent.disableEditMode();
        this.getCategories();
      },
      error: (err: Error) => console.error(`Error editing category: ${err.message}` ),
      complete: () => console.log("Category updated successfuly")
    });
  }

  deleteCategory(category: Category) {
    let dialogRef = this.dialog.open(ConfirmDeleteCategoryDialogComponent, {
      data: { categoryName: category.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.categoriesService.deleteCategory(category.id).subscribe({
          next: (response: any) => this.getCategories(),
          error: (err: Error) => console.error("Could not delete category: "+err.message),
          complete: () => console.log("Category deleted!")
        });
      }
    });
  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (response: Product[]) => this.productsService.productsSubject$.next(response),
      error: (err: Error) => console.error("Could not retrieve products" + err.message),
      complete: () => console.log("Products retrieved successfully")
    });
  }

  addProduct(product: ProductPOST) {
    this.productsService.addProduct(product).subscribe({
      next: (response: any) => this.getProducts(),
      error: (err: Error) => console.error(`Error adding product: ${err.message}`),
      complete: () => console.log("Product added successfully")
    });
  }

  updateProduct(productPUT: ProductPUT) {
    this.productsService.updateProduct(productPUT).subscribe({
      next: (response: any) => this.getProducts(),
      error: (err: Error) => console.error(`Error updating product: ${err.message}`),
      complete: () => console.log("Product updated successfully")
    });
  }
}
