import { AfterViewInit, Component, EventEmitter, Input, Output, Signal, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductsService } from 'src/app/core/services/products.service';
import { IProduct } from 'src/app/models/product.model';
import { MaterialTableDataSource } from './material-table-datasource';
import { BreakpointObserver } from '@angular/cdk/layout';
import { fromEvent } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { DisplayedColumns } from '../../../displayed-columns.model';
import { IconButton } from 'src/app/shared/icon-button/icon-button.model';
import { MaterialIcon } from 'src/app/shared/icon-button/material-icons.enum';
import { IconButtonType } from 'src/app/shared/icon-button/icon-button-type.enum';


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
  
  displayedColumns: WritableSignal<DisplayedColumns> = signal(this.getDisplayedColumns());
  displayedColumnsWithActions: Signal<DisplayedColumns> = computed(() => {
    return {
      columnsName: [...this.displayedColumns().columnsName, 'actions'],
      columnsTitle: [...this.displayedColumns().columnsTitle, ''] 
    }
  });

  showDetailButton: IconButton = {
    icon: { iconName: 'arrow-right', svgIcon: MaterialIcon.ARROW_RIGHT_FILL0_W300_GRAD0_SZ20 },
    matButtonType: IconButtonType.MAT_ICON_BUTTON,
    color: undefined
  }

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
        this.displayedColumns.set(this.getDisplayedColumns());
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

  getDisplayedColumns(): DisplayedColumns {
    return this.breakpointObserver.isMatched(this.displayedColumnsWithExtraInfoBreakpoint) 
            ? this.displayedColumnsWithExtraInfo
            : this.breakpointObserver.isMatched(this.displayedColumnsWithAvailabilityBreakpoint)
            ? this.displayedColumnsWithAvailability
            : this.displayedColumnsReduced
  }
}