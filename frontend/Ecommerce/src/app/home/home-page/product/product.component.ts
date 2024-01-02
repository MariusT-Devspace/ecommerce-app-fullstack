import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { IconButtonType } from 'src/app/shared/icon-button/icon-button-type.enum';
import { IconButton } from 'src/app/shared/icon-button/icon-button.model';
import { MaterialIcon } from 'src/app/shared/icon-button/material-icons.enum';

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

  addToCartButton: IconButton = {
    icon: { iconName: 'shopping-cart', svgIcon: MaterialIcon.SHOPPING_CART_FILL0_W300_GRAD0_SZ20 },
    matButtonType: IconButtonType.MAT_BUTTON,
    color: undefined
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(){

  }

}
