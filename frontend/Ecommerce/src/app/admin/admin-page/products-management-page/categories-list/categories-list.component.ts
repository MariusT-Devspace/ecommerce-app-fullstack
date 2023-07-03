import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ICategory } from 'src/app/models/category.model';
import { ICategoryPOST } from 'src/app/models/categoryPOST.model';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.sass']
})
export class CategoriesListComponent implements OnInit{
  @Input() categories : ICategory[] = []
  @Output() onAddCategory = new EventEmitter<ICategoryPOST>();

  ADD_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg>`
  addCategoryEnabled: boolean = false;
  newCategoryForm: FormGroup = new FormGroup({})

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private categoriesService: CategoriesService) {
    this.iconRegistry.addSvgIconLiteral('add', this.sanitizer.bypassSecurityTrustHtml(this.ADD_ICON));
  }
  ngOnInit(): void {
    this.newCategoryForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(50),
      ])
    })
  }

  get categoryName() {
    return this.newCategoryForm.value.name;
  }

  toggleAddCategory() {
    this.addCategoryEnabled = !this.addCategoryEnabled;
    if (this.addCategoryEnabled)
      this.newCategoryForm.reset();
  }

  submitCategory() {
    const category: ICategoryPOST = {
      name: this.categoryName
    };
    /* TODO Show validation errors to user */
    if(this.newCategoryForm.valid)
      this.onAddCategory.emit(category);
  }

}
