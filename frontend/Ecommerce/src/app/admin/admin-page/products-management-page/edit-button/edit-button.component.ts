import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.sass']
})
export class EditButtonComponent {
  EDIT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M210.154-204h52.461l361.387-361.386-52.461-52.462-361.387 361.387V-204Zm549.152-404.77L615.309-753.537l45.538-45.538q19.231-19.23 45.461-19.23 26.23 0 45.46 19.23l53.461 53.461q18.231 18.23 17.846 45.845-.385 27.615-18.615 45.845l-45.154 45.154ZM184.309-140.001q-15.461 0-26.807-11.347-11.346-11.346-11.346-26.807v-90.767q0-7.231 2.615-13.769 2.615-6.539 8.231-12.154l413.923-413.924 143.998 143.998-413.924 413.923q-5.615 5.616-12.153 8.231-6.539 2.616-13.77 2.616h-90.767Zm413.77-451.308-26.538-26.539 52.461 52.462-25.923-25.923Z"/></svg>`;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('edit', sanitizer.bypassSecurityTrustHtml(this.EDIT_ICON));
  }
}
