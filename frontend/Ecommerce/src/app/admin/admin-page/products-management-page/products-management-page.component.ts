import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ICategory } from 'src/app/models/category.model';
import { ICategoryPOST } from 'src/app/models/categoryPOST.model';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteCategoryDialogComponent } from './categories-list/confirm-delete-category-dialog/confirm-delete-category-dialog.component';

@Component({
  selector: 'app-products-management-page',
  templateUrl: './products-management-page.component.html',
  styleUrls: ['./products-management-page.component.sass']
})
export class ProductsManagementPageComponent implements OnInit{
  categories : ICategory[] = []  
  @ViewChild(CategoriesListComponent) categoriesListCardComponent!: CategoriesListComponent;

  constructor (private categoriesService : CategoriesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response: ICategory[]) => {
        this.categories = response
        console.log(this.categories)
      },
      error: (err: Error) => console.error("Error retrieving categories", err),
      complete: () => console.log("Categories retrieved successfuly")
    });
  }

  addCategory(category: ICategoryPOST) {
    this.categoriesService.addCategory(category).subscribe({
      next: (response: any) => {
        console.log(response.status);
        this.categoriesListCardComponent.toggleAddCategory();
        this.getCategories();
      },
      error: (err: Error) => console.error(`Error submitting category: ${err.message}`),
      complete: () => console.log("Category added successfuly")
    });
  }

  editCategory(category: ICategory) {
    this.categoriesService.editCategory(category).subscribe({
      next: (response: any) => { 
        this.categoriesListCardComponent.disableEditMode();
        this.getCategories();
      },
      error: (err: Error) => console.error(`Error editing category: ${err.message}` ),
      complete: () => console.log("Category updated successfuly")
    });
  }

  deleteCategory(category: ICategory) {
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
    }
  );
  }
}
