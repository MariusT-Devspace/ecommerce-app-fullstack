import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass']
})
export class ProductsListComponent {
  breakpoint$ = this.breakpointObserver.observe(Breakpoints.Handset)
              .pipe(
                map(result => result.matches ? 'handset' : 'desktop')
              );


  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }

  addProduct() {
    
  }

  openDialog(): void {
    let enterAnimationDuration = '300ms';
    let exitAnimationDuration = '150ms';
    let disableClose = true;
    let minWidth = 350;
    this.breakpoint$.subscribe({
      next: (v) => { 
        if (v === 'desktop')
          minWidth = 500;
      }
    });

    this.dialog.open(AddProductDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose,
      minWidth
    });
  }
}