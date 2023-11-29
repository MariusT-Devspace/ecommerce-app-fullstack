import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductsService } from 'src/app/core/services/products.service';
import { IProduct } from 'src/app/models/product.model';
import { MaterialTableDataSource } from './material-table-datasource';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject, fromEvent, map } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { DisplayedColumns } from '../../../displayed-columns.model';


@Component({
  selector: 'app-products-material-table',
  templateUrl: './products-material-table.component.html',
  styleUrls: ['./products-material-table.component.css']
})
export class ProductsMaterialTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IProduct>;
  dataSource: MaterialTableDataSource;

  @Input() categories: ICategory[] = []
  @Output() onOpenDialog = new EventEmitter<number>;
  @Output() onGetProducts = new EventEmitter();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumnsReduced: DisplayedColumns = {
    columnsName: ['id', 'title'],
    columnsTitle: ['Id', 'Title']
  };
  displayedColumnsWithAvailability: DisplayedColumns = {
    columnsName: ['id', 'title', 'isAvailable'],
    columnsTitle: ['Id', 'Title', 'Available']
  };
  displayedColumnsWithExtraInfo: DisplayedColumns = {
    columnsName: ['id', 'title', 'isAvailable', 'category'],
    columnsTitle: ['Id', 'Title', 'Available', 'Category']
  };
  
  displayedColumnsWithAvailabilityBreakpoint = '(min-width: 447px)'
  displayedColumnsWithExtraInfoBreakpoint = '(min-width: 632px)'
  
  displayedColumns$ = new BehaviorSubject<DisplayedColumns>(
    this.breakpointObserver.isMatched(this.displayedColumnsWithExtraInfoBreakpoint) 
    ? this.displayedColumnsWithExtraInfo
    : this.breakpointObserver.isMatched(this.displayedColumnsWithAvailabilityBreakpoint)
    ? this.displayedColumnsWithAvailability
    : this.displayedColumnsReduced
  );
  displayedColumnsWithActions$ = new BehaviorSubject<DisplayedColumns>({
    columnsName: [...this.displayedColumns$.value.columnsName, 'actions'],
    columnsTitle: [...this.displayedColumns$.value.columnsTitle, ''] 
  });

  constructor(private productsService: ProductsService, private breakpointObserver: BreakpointObserver) {
    this.dataSource = new MaterialTableDataSource(productsService);
  }
  
  ngAfterViewInit(): void {
    this.onGetProducts.emit();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    fromEvent(window, 'resize').subscribe({
      next: () => { 
        this.displayedColumns$.next(
          this.breakpointObserver.isMatched(this.displayedColumnsWithExtraInfoBreakpoint)
          ? this.displayedColumnsWithExtraInfo
          : this.breakpointObserver.isMatched(this.displayedColumnsWithAvailabilityBreakpoint)
          ? this.displayedColumnsWithAvailability
          : this.displayedColumnsReduced
        );
        this.displayedColumnsWithActions$.next({
          columnsName: [...this.displayedColumns$.value.columnsName, 'actions'],
          columnsTitle: [...this.displayedColumns$.value.columnsTitle, ''] 
        });
      }
    })
  }

  getCategoryById(id: Number) {
    return this.categories.find(category => category.id == id) 
            ? this.categories.find(category => category.id == id)?.name
            : 'None'
  }

  openProductDetailDialog(selectedProductId: number) {
    this.onOpenDialog.emit(selectedProductId);
  }
}

