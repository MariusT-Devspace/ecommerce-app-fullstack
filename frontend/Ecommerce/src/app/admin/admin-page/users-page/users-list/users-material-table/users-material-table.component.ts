import { AfterViewInit, Component, EventEmitter, Output, Signal, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialTableDataSource } from './material-table-datasource';
import { User } from 'src/app/models/user.model';
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
  @ViewChild(MatTable) table!: MatTable<User>;
  dataSource: MaterialTableDataSource;

  @Output() onGetUsers = new EventEmitter();
  @Output() onOpenUserDetailDialog = new EventEmitter<User>();

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
  
  displayedColumns: WritableSignal<DisplayedColumns> = signal(this.getDisplayedColumns());
  displayedColumnsWithActions: Signal<DisplayedColumns> = computed(() => {
    return {
      columnsName: [...this.displayedColumns().columnsName, 'actions'],
      columnsTitle: [...this.displayedColumns().columnsTitle, '']
    }
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
        this.displayedColumns.set(this.getDisplayedColumns());
      }
    });
  }

  openUserDetailDialog(user: User) {
    this.onOpenUserDetailDialog.emit(user);
  }

  getDisplayedColumns(): DisplayedColumns {
    return this.breakpointObserver.isMatched(this.displayedColumnsWithNameBreakpoint)
            ? this.displayedColumnsWithName
            : this.breakpointObserver.isMatched(this.displayedColumnsReducedBreakpoint)
            ? this.displayedColumnsReduced
            : this.displayedColumnsCompact
  }
}
