import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.sass']
})
export class CancelButtonComponent {
  CANCEL_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-434.847 280.076-234.924q-9.307 9.308-21.884 9-12.576-.307-22.268-10-9.693-9.692-9.693-22.576t9.693-22.576L434.847-480 234.924-679.924q-9.308-9.307-9-22.384.307-13.076 10-22.768 9.692-9.693 22.576-9.693t22.576 9.693L480-525.153l199.924-199.923q9.307-9.308 22.384-9.5 13.076-.193 22.768 9.5 9.693 9.692 9.693 22.576t-9.693 22.576L525.153-480l199.923 199.924q9.308 9.307 9.5 21.884.193 12.576-9.5 22.268-9.692 9.693-22.576 9.693t-22.576-9.693L480-434.847Z"/></svg>`;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIconLiteral('cancel', this.sanitizer.bypassSecurityTrustHtml(this.CANCEL_ICON));
  }
}
