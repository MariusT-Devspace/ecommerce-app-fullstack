import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialTableDataSource } from './material-table-datasource';
import { IUser } from 'src/app/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BreakpointObserver } from '@angular/cdk/layout';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { UserRole } from 'src/app/core/auth/models/token.model';

interface DisplayedColumns {
  columnsName: string[],
  columnsTitle: string[]
}

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

  UserRole = UserRole

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  displayedColumnsCompact: DisplayedColumns = {
    columnsName : ['email'],
    columnsTitle : ['Email']
  };

  displayedColumnsReduced: DisplayedColumns = {
    columnsName : ['userName', 'email'],
    columnsTitle : ['Username', 'Email']
  };

  displayedColumnsWithName: DisplayedColumns = {
    columnsName : ['userName', 'name', 'email'],
    columnsTitle : ['Username', 'Name', 'Email']
  };

  displayedColumnsReducedBreakpoint = '(min-width: 442px)';
  displayedColumnsWithNameBreakpoint = '(min-width: 560px)';
  
  displayedColumns$ = new BehaviorSubject<DisplayedColumns>(
    this.breakpointObserver.isMatched(this.displayedColumnsWithNameBreakpoint)
    ? this.displayedColumnsWithName
    : this.breakpointObserver.isMatched(this.displayedColumnsReducedBreakpoint)
    ? this.displayedColumnsReduced
    : this.displayedColumnsCompact
  );

  displayedColumnsWithActions$ = new BehaviorSubject<DisplayedColumns>({
        columnsName: [...this.displayedColumns$.value.columnsName, 'actions'],
        columnsTitle: [...this.displayedColumns$.value.columnsTitle, '']
      }
    );

  constructor(private usersService: UsersService, private breakpointObserver: BreakpointObserver) {
    this.dataSource = new MaterialTableDataSource(this.usersService);
  }

  ngAfterViewInit(): void {
    this.onGetUsers.emit();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    fromEvent(window, 'resize').subscribe({
      next: () => {
        this.displayedColumns$.next(
          this.breakpointObserver.isMatched(this.displayedColumnsWithNameBreakpoint)
          ? this.displayedColumnsWithName
          : this.breakpointObserver.isMatched(this.displayedColumnsReducedBreakpoint)
          ? this.displayedColumnsReduced
          : this.displayedColumnsCompact
        );
        this.displayedColumnsWithActions$.next({
          columnsName: [...this.displayedColumns$.value.columnsName, 'actions'],
          columnsTitle: [...this.displayedColumns$.value.columnsTitle, '']
        });
      }
    });
  }
}
