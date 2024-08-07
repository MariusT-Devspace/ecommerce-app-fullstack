import { Component, Input } from '@angular/core';
import { ThemeColor } from 'src/app/constants';
import { Product } from 'src/app/models/product.model';
import { IconButtonType } from 'src/app/shared/icon-button/icon-button-type.enum';
import { IconButton } from 'src/app/shared/icon-button/icon-button.model';
import { MaterialIcon } from 'src/app/shared/icon-button/material-icons.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent{
  @Input() product: Product = {
    id: 0,
    title: "",
    description: "",
    price: 0.00,
    picture: "",
    isAvailable: true,
    ratingId: 0,
    categoryId: "",
    createdOn: ""
  };

  addToCartButton: IconButton = {
    icon: { iconName: 'shopping-cart', svgIcon: MaterialIcon.SHOPPING_CART_FILL0_W300_GRAD0_SZ20 },
    matButtonType: IconButtonType.MAT_FLAT_BUTTON,
    color: ThemeColor.ACCENT
  }

  constructor() {}
}
