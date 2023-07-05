import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-done-button',
  templateUrl: './done-button.component.html',
  styleUrls: ['./done-button.component.sass']
})
export class DoneButtonComponent {
  DONE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M383-268.924q-7.231 0-13.961-2.808-6.731-2.807-13.346-9.423l-164-163.999q-9.692-9.692-9.385-23.384.308-13.692 10-23.384 9.692-9.693 23.077-9.693 13.384 0 23.076 9.693L385-345.384l337.539-337.538q9.692-9.693 22.384-9.693t22.384 9.693q9.692 9.692 9.692 22.384t-9.692 22.384l-357 356.999q-6.615 6.616-13.346 9.423-6.73 2.808-13.961 2.808Z"/></svg>`;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIconLiteral('done', this.sanitizer.bypassSecurityTrustHtml(this.DONE_ICON));
  }
}
