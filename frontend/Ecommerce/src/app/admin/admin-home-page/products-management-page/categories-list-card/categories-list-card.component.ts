import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICategory } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories-list-card',
  templateUrl: './categories-list-card.component.html',
  styleUrls: ['./categories-list-card.component.sass']
})
export class CategoriesListCardComponent {
  @Input() categories : ICategory[] = []

  ADD_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg>`

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('add', sanitizer.bypassSecurityTrustHtml(this.ADD_ICON));
  }
}

