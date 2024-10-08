import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemeColor } from 'src/app/constants';
import { Category } from 'src/app/models/category.model';
import { CategoryPOST } from 'src/app/models/DTOs/category-post.model';
import { CategoryPUT } from 'src/app/models/DTOs/category-put.model';
import { IconButtonType } from 'src/app/shared/icon-button/icon-button-type.enum';
import { IconButton } from 'src/app/shared/icon-button/icon-button.model';
import { MaterialIcon } from 'src/app/shared/icon-button/material-icons.enum';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.sass']
})
export class CategoriesListComponent implements OnInit{
  @Input() categories : Category[] = []
  @Output() onAddCategory = new EventEmitter<CategoryPOST>();
  @Output() onEditCategory = new EventEmitter<CategoryPUT>();
  @Output() onDeleteCategory = new EventEmitter<number>();

  isAddCategoryMode: boolean = false;
  categoryForm: FormGroup = new FormGroup({})
  isEditMode: boolean = false;
  editIndex: number = -1;

  // Icon buttons
  newCategoryButton: IconButton = {
    icon: { iconName: 'add', svgIcon: MaterialIcon.ADD_FILL0_W400_GRAD0_SZ20 },
    matButtonType: IconButtonType.MAT_BUTTON,
    color: ThemeColor.PRIMARY
  }

  editIconButton: IconButton = {
    icon: { iconName: 'edit', svgIcon: MaterialIcon.EDIT_FILL0_W300_GRAD0_SZ20 },
    matButtonType: IconButtonType.MAT_ICON_BUTTON,
    color: undefined
  }

  deleteIconButton: IconButton = {
    icon: { iconName: 'delete', svgIcon: MaterialIcon.DELETE_FILL0_W300_GRAD0_SZ20 },
    matButtonType: IconButtonType.MAT_ICON_BUTTON,
    color: undefined
  }

  cancelIconButton: IconButton = {
    icon: { iconName: 'cancel', svgIcon: MaterialIcon.CLOSE_FILL0_W300_GRAD0_SZ20 },
    matButtonType: IconButtonType.MAT_ICON_BUTTON,
    color: undefined
  }

  doneIconButton: IconButton = {
    icon: { iconName: 'done', svgIcon: MaterialIcon.DONE_FILL0_W300_GRAD0_SZ20 },
    matButtonType: IconButtonType.MAT_ICON_BUTTON,
    color: undefined
  }

  addImageIconButton: IconButton = {
    icon: { iconName: 'addImage', svgIcon: MaterialIcon.ADD_IMAGE_FILL0_W400_GRAD0_SZ24 },
    matButtonType: IconButtonType.MAT_ICON_BUTTON,
    color: undefined
  }

  get categoryName(): string {
    return this.categoryForm.value.name;
  }

  /* TODO: Implement pagination or scrolling */

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(50),
      ])
    })
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
  }

  disableEditMode() {
    this.editIndex = -1;
    this.isEditMode = false;
    this.categoryForm.reset();
  }

  submitCategory() {
    /* TODO: Show validation errors to user */
    if(this.categoryForm.valid) {
      this.onAddCategory.emit({ name: this.categoryName });
    }
      
  }

  editCategory(id: number) {
    /* TODO: Show validation errors to user */
    if(this.categoryForm.valid){
      const categoryRequestPUT: CategoryPUT = {
        id,
        name: this.categoryName
      }
      this.onEditCategory.emit(categoryRequestPUT);
    }
  }

  deleteCategory(id: number) {
    this.onDeleteCategory.emit(Number(id));
  }
}
