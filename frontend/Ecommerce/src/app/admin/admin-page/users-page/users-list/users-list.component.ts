import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/models/user.model';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent {
  constructor(private usersService: UsersService, public dialog: MatDialog) {}

  getUsers() {
    this.usersService.getUsers().subscribe({
      next: (response: User[]) => this.usersService.usersSubject$.next(response),
      error: (err: Error) => console.error("Could not retrieve users" + err.message),
      complete: () => console.log("Users retrieved successfully")
    });
  }

  deleteUser(id: string) {
    this.usersService.deleteUser(id).subscribe({
      next: (responer: any) => this.getUsers(),
      error: (err: Error) => console.error(`Error deleting user: ${err.message}`),
      complete: () => console.log(`User with id ${id} deleted successfully`)
    });
  }

  openUserDetailDialog(user: User): void {
    let enterAnimationDuration = '300ms';
    let exitAnimationDuration = '150ms';
    let disableClose = true;

    const openUserDetailDialogRef = this.dialog.open(UserDetailDialogComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose,
      data: {
        user: user
      }
    });

    openUserDetailDialogRef.componentInstance.onDeleteUser.subscribe({
      next: (userId: string) => { 
        this.deleteUser(userId);
        this.dialog.closeAll();
      },
      error: (err: Error) => console.error(`Error deleting user: ${err.message}`),
      complete: () => {}
    });
  }
}
