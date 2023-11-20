import { Component } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent {
  
  constructor(private usersService: UsersService) {}

  getUsers() {
    this.usersService.getUsers().subscribe({
      next: (response: IUser[]) => this.usersService.usersSubject$.next(response),
      error: (err: Error) => console.error("Could not retrieve users" + err.message),
      complete: () => console.log("Users retrieved successfully")
    });
  }
}
