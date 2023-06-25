import { Component, Input } from '@angular/core';
import { ICategory } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories-list-card',
  templateUrl: './categories-list-card.component.html',
  styleUrls: ['./categories-list-card.component.sass']
})
export class CategoriesListCardComponent {
  @Input() categories : ICategory[] = []
}
