import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IProduct } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit{
  @Input() product: IProduct = {
    id: 0,
    title: "",
    description: "",
    price: 0.00,
    picture: "",
    isAvailable: true,
    ratingId: 0,
    categoryId: 0,
    createdOn: ""
  };

  breakpoint = this.breakpointObserver.observe(Breakpoints.Handset)
              .pipe(
                map(result => result.matches ? 'handset' : 'desktop')
              );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(){

  }

}
