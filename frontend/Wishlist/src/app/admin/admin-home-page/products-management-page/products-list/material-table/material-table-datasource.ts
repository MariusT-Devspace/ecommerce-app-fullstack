import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { IProduct } from 'src/app/models/product.model';

// TODO: Replace this with your own data model type
export interface MaterialTableItem {
  name: string;
  id: number;
}


/**
 * Data source for the MaterialTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MaterialTableDataSource extends DataSource<IProduct> {
  data: IProduct[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private productsSubject$ = new BehaviorSubject<IProduct[]>([]);

  constructor(private productsService: ProductsService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(collectionViewer: CollectionViewer): Observable<IProduct[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      // return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
      //   .pipe(map(() => {
      //     return this.getPagedData(this.getSortedData([...this.data ]));
      //   }));
      return this.productsSubject$.asObservable();
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (response: IProduct[]) => this.productsSubject$.next(response),
      error: (err: Error) => console.error("Could not retrieve products" + err.message),
      complete: () => console.log("All products have been retrieved")
    });
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MaterialTableItem[]): MaterialTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MaterialTableItem[]): MaterialTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
