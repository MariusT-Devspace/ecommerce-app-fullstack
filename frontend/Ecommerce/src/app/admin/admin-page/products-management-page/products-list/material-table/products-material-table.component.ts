import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductsService } from 'src/app/core/services/products.service';
import { IProduct } from 'src/app/models/product.model';
import { MaterialTableDataSource } from './material-table-datasource';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, fromEvent, map } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';


@Component({
  selector: 'app-products-material-table',
  templateUrl: './products-material-table.component.html',
  styleUrls: ['./products-material-table.component.css']
})
export class ProductsMaterialTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IProduct>;
  dataSource: MaterialTableDataSource;

  @Input() categories: ICategory[] = []
  @Output() onOpenDialog = new EventEmitter<number>;
  @Output() onGetProducts = new EventEmitter();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumnsReduced = ['id', 'title', 'actions'];
  displayedColumnsWithAvailability = ['id', 'title', 'isAvailable', 'actions'];
  displayedColumnsWithExtraInfo = ['id', 'title', 'isAvailable', 'category', 'actions'];
  
  showIsAvailableBreakpointPortrait = '(min-width: 447px) and (max-width: 600px) and (orientation: portrait)'
  showIsAvailableBreakpointLandscape = '(min-width: 447px) and (orientation: landscape)'
  showCategoryBreakpointPortrait = '(min-width: 772px) and (orientation: portrait)'
  showCategoryBreakpointLandscape = '(min-width: 632px) and (orientation: landscape)'

  showIsAvailable$ = new BehaviorSubject<boolean>(
                      this.breakpointObserver.isMatched(this.showIsAvailableBreakpointPortrait) || 
                      this.breakpointObserver.isMatched(this.showIsAvailableBreakpointLandscape) ||
                      this.breakpointObserver.isMatched(this.showCategoryBreakpointPortrait)
                    )

  showCategory$ = new BehaviorSubject<boolean>(
                    this.breakpointObserver.isMatched(this.showCategoryBreakpointPortrait) || 
                    this.breakpointObserver.isMatched(this.showCategoryBreakpointLandscape)
                  )
  
  displayedColumns$ = new BehaviorSubject<Array<String>>(
                        this.showCategory$.value 
                        ? this.displayedColumnsWithExtraInfo
                        : this.showIsAvailable$.value
                          ? this.displayedColumnsWithAvailability
                          : this.displayedColumnsReduced
                      )

  constructor(private productsService: ProductsService, private breakpointObserver: BreakpointObserver) {
    this.dataSource = new MaterialTableDataSource(productsService);
  }
  
  ngOnInit(): void {
    fromEvent(window, 'resize').subscribe({
      next: () => { 
        //this.showIsAvailable$.next(this.breakpointObserver.isMatched('(min-width: 390px)'))
        this.showCategory$.subscribe({
          next: (value: boolean) => {
            if (value) {
              this.displayedColumns$.next(this.displayedColumnsWithExtraInfo)
              console.log("show category")
            }
            else {
              this.showIsAvailable$.subscribe({
                next: (value: boolean) => {
                  if (value) {
                    this.displayedColumns$.next(this.displayedColumnsWithAvailability)
                    console.log("show isAvailable")
                  }
                  else {
                    this.displayedColumns$.next(this.displayedColumnsReduced)
                    console.log("show reduced")
                  }
                }
              });
            }
          }
        });

        this.showIsAvailable$.next(
          this.breakpointObserver.isMatched(this.showIsAvailableBreakpointPortrait) || 
          this.breakpointObserver.isMatched(this.showIsAvailableBreakpointLandscape) ||
          this.breakpointObserver.isMatched(this.showCategoryBreakpointPortrait)
        )

        this.showCategory$.next(
          this.breakpointObserver.isMatched(this.showCategoryBreakpointPortrait) || 
          this.breakpointObserver.isMatched(this.showCategoryBreakpointLandscape)
        )
      }
    })  
  }

  ngAfterViewInit(): void {
    this.onGetProducts.emit();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
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

