import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ICategory } from 'src/app/models/category.model';
import { ICategoryPOST } from 'src/app/models/categoryPOST.model';
import { CategoriesListCardComponent } from './categories-list-card/categories-list-card.component';

@Component({
  selector: 'app-products-management-page',
  templateUrl: './products-management-page.component.html',
  styleUrls: ['./products-management-page.component.sass']
})
export class ProductsManagementPageComponent implements OnInit{
  categories : ICategory[] = []  
  @ViewChild(CategoriesListCardComponent) categoriesListCardComponent!: CategoriesListCardComponent;

  constructor (private categoriesService : CategoriesService) {}

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
    console.log("New category: ", category)
    this.categoriesService.addCategory(category).subscribe({
      next: (response) => {
        console.log(response.status);
        this.categoriesListCardComponent.toggleAddCategory();
      },
      error: (err: Error) => {
        console.error(`Error submitting category: ${err.message}`);
      },
      complete: () => {
        console.log("Submit new category completed");
      }
    });
  }
}
