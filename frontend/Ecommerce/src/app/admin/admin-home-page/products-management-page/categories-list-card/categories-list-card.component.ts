import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ICategory } from 'src/app/models/category.model';
import { ICategoryPOST } from 'src/app/models/categoryPOST.model';

@Component({
  selector: 'app-categories-list-card',
  templateUrl: './categories-list-card.component.html',
  styleUrls: ['./categories-list-card.component.sass']
})
export class CategoriesListCardComponent implements OnInit{
  @Input() categories : ICategory[] = []
  @Output() onAddCategory = new EventEmitter<ICategoryPOST>();

  ADD_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg>`
  addCategoryEnabled: boolean = false;
  newCategoryForm: FormGroup = new FormGroup({})

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private categoriesService: CategoriesService) {
    iconRegistry.addSvgIconLiteral('add', sanitizer.bypassSecurityTrustHtml(this.ADD_ICON));
  }
  ngOnInit(): void {
    this.newCategoryForm = this.formBuilder.group({
      categoryName: new FormControl('')
    })
  }

  toggleAddCategory() {
    this.addCategoryEnabled = !this.addCategoryEnabled;
    if (this.addCategoryEnabled)
      this.newCategoryForm.reset();
  }

  submitCategory() {
    const category: ICategoryPOST = this.newCategoryForm.value;
    this.onAddCategory.emit(category);
  }

}
