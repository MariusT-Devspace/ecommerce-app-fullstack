import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDetailDialogComponent } from '../../../products-management-page/products-list/product-detail-dialog/product-detail-dialog.component';
import { IUser } from 'src/app/models/user.model';
import { UserRole } from 'src/app/core/auth/models/token.model';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrl: './user-detail-dialog.component.sass'
})
export class UserDetailDialogComponent {
  
  user: IUser = this.data.user
  UserRole = UserRole

  constructor(
      private userDetailDialogRef:  MatDialogRef<ProductDetailDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: {
        user: IUser
      }
    ) {}
}
