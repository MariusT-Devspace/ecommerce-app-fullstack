import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialTableDataSource } from './material-table-datasource';
import { IUser } from 'src/app/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})
export class MaterialTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IUser>;
  dataSource: MaterialTableDataSource;

  @Output() onGetUsers = new EventEmitter();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = {
    columnsName : ['userName', 'firstName', 'lastName', 'email', 'role', 'createdOn', 'updatedOn'],
    columnsTitle : ['Username', 'First Name', 'Last Name', 'Email', 'Role', 'Created On', 'Updated On']
  };



  constructor(private usersService: UsersService) {
    this.dataSource = new MaterialTableDataSource(this.usersService);
  }

  ngAfterViewInit(): void {
    this.onGetUsers.emit();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
