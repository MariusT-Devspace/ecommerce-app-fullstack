import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ICategory } from 'src/app/models/category.model';
import { ICategoryPOST } from 'src/app/models/categoryPOST.model';

@Component({
  selector: 'app-products-management-page',
  templateUrl: './products-management-page.component.html',
  styleUrls: ['./products-management-page.component.sass']
})
export class ProductsManagementPageComponent implements OnInit{
  categories : ICategory[] = []  

  constructor (private categoriesService : CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response: ICategory[]) => this.categories = response,
      error: (err: Error) => console.error("Error retrieving categories", err),
      complete: () => console.log("Categories retrieved successfuly")
    });
  }

  addCategory(category: ICategoryPOST) {
    this.categoriesService.addCategory(category).subscribe({
      next: (response) => {
        console.log(response.status);
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
