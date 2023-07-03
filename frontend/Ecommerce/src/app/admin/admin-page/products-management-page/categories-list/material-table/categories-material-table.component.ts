import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ICategory } from 'src/app/models/category.model';
import { MaterialTableDataSource } from './material-table-datasource';


@Component({
  selector: 'app-categories-material-table',
  templateUrl: './categories-material-table.component.html',
  styleUrls: ['./categories-material-table.component.css']
})
export class CategoriesMaterialTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ICategory>;
  dataSource: MaterialTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'actions'];

  constructor(private categoriesService: CategoriesService) {
    this.dataSource = new MaterialTableDataSource(categoriesService);
  }

  ngAfterViewInit(): void {
    this.dataSource.getCategories();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

