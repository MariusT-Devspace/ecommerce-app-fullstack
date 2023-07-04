import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-category-dialog',
  templateUrl: './confirm-delete-category-dialog.component.html',
  styleUrls: ['./confirm-delete-category-dialog.component.sass']
})
export class ConfirmDeleteCategoryDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteCategoryDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { categoryName: string }) {}
}
