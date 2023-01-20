import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductsService } from 'src/app/core/services/products.service';
import { IProduct } from 'src/app/models/product.model';
import { MaterialTableDataSource, MaterialTableItem } from './material-table-datasource';


@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})
export class MaterialTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IProduct>;
  dataSource: MaterialTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'description', 'isAvailable'];

  @Output() onOpenDialog = new EventEmitter();

  constructor(private productsService: ProductsService) {
    this.dataSource = new MaterialTableDataSource(productsService);
  }

  ngAfterViewInit(): void {
    this.dataSource.getProducts();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openDialog() {
    this.onOpenDialog.emit();
  }
}

