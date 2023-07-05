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
  @Output() onDeleteCategory = new EventEmitter<ICategory>();
  @Output() onEditCategory = new EventEmitter<ICategory>

  ADD_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg>`
  isAddCategoryMode: boolean = false;
  categoryForm: FormGroup = new FormGroup({})
  isEditMode: boolean = false;
  editIndex: number = -1;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private categoriesService: CategoriesService) {
    this.iconRegistry.addSvgIconLiteral('add', this.sanitizer.bypassSecurityTrustHtml(this.ADD_ICON));
  }
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(50),
      ])
    })
  }

  get categoryName() {
    return this.categoryForm.value.name;
  }

  toggleAddCategory() {
    this.isAddCategoryMode = !this.isAddCategoryMode;
    if (this.isAddCategoryMode){
      this.categoryForm.reset();
      this.isEditMode = false;
    }
      
  }

  enableEditMode(index: number, inputValue: string) {
    console.log("toggle edit mode called");
    this.isEditMode = true;
    this.isAddCategoryMode = false;
    this.editIndex = index;
    this.categoryForm.setValue({name: inputValue});
    console.log(`edit mode: ${this.isEditMode}. index = ${this.editIndex}`);
  }

  disableEditMode() {
    this.editIndex = -1;
    this.isEditMode = false;
    this.categoryForm.reset();
  }

  submitCategory() {
    const category: ICategoryPOST = {
      name: this.categoryName
    };
    /* TODO Show validation errors to user */
    if(this.categoryForm.valid)
      this.onAddCategory.emit(category);
  }

  editCategory(id: number) {
    /* TODO Show validation errors to user */
    if(this.categoryForm.valid){
      const category: ICategory = {
        id: id,
        name: this.categoryName
      }
      this.onEditCategory.emit(category);
    }
  }

  deleteCategory(category: ICategory) {
    this.onDeleteCategory.emit(category);
  }

  
}
