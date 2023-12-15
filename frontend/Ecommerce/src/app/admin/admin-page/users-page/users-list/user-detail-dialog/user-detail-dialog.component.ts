import { Component, EventEmitter, Inject, LOCALE_ID, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDetailDialogComponent } from '../../../products-management-page/products-list/product-detail-dialog/product-detail-dialog.component';
import { IUser } from 'src/app/models/user.model';
import { UserRole } from 'src/app/core/auth/models/token.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/internal/operators/map';
import {formatDate} from '@angular/common';

enum Layout {
  Handset, 
  Desktop
}

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrl: './user-detail-dialog.component.sass'
})
export class UserDetailDialogComponent {
  @Output() onDeleteUser = new EventEmitter<string>();

  user: IUser = this.data.user
  UserRole = UserRole
  Layout = Layout
  layout: Layout | undefined

  formatDate = formatDate
  _locale = this.locale

  breakpoint$ = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small
  ]).pipe(
    map(result => result.matches ? 'handset' : 'desktop')
  );

  constructor(
      public userDetailDialogRef:  MatDialogRef<UserDetailDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: {
        user: IUser
      },
      private breakpointObserver: BreakpointObserver,
      @Inject(LOCALE_ID) private locale: string
    ) {
      this.breakpoint$.subscribe({
        next: (v) => {
          if (v === 'desktop') {
            userDetailDialogRef.updateSize('400px');
            this.layout = Layout.Desktop
          } else {
            userDetailDialogRef.updateSize('300px');
            this.layout = Layout.Handset
          }
        }
      });
    }

    deleteUser() {
      this.onDeleteUser.emit(this.user.id);
    }
}
