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
import { DisplayedColumns } from '../../../displayed-columns.model';
import { IconButton } from 'src/app/shared/icon-button/icon-button.model';
import { MaterialIcon } from 'src/app/shared/icon-button/material-icons.enum';
import { IconButtonType } from 'src/app/shared/icon-button/icon-button-type.enum';

@Component({
  selector: 'app-material-table',
  templateUrl: './users-material-table.component.html',
  styleUrls: ['./users-material-table.component.css']
})
export class UsersMaterialTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IUser>;
  dataSource: MaterialTableDataSource;

  @Output() onGetUsers = new EventEmitter();
  @Output() onOpenUserDetailDialog = new EventEmitter<IUser>();

  showDetailButton: IconButton = {
    icon: { iconName: 'arrow-right', svgIcon: MaterialIcon.ARROW_RIGHT_FILL0_W300_GRAD0_SZ20 },
    matButtonType: IconButtonType.MAT_ICON_BUTTON,
    color: undefined
  }

  UserRole = UserRole

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  displayedColumnsCompact: DisplayedColumns = {
    columnsName: ['email'],
    columnsTitle: ['Email']
  };

  displayedColumnsReduced: DisplayedColumns = {
    columnsName: ['userName', 'email'],
    columnsTitle: ['Username', 'Email']
  };

  displayedColumnsWithName: DisplayedColumns = {
    columnsName: ['userName', 'name', 'email'],
    columnsTitle: ['Username', 'Name', 'Email']
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
  });

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

  openUserDetailDialog(user: IUser) {
    this.onOpenUserDetailDialog.emit(user);
  }
}
