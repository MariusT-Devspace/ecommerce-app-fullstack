import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.sass']
})
export class EditButtonComponent {
  EDIT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M173 884h53l440-441-53-53-440 441v53Zm638-484L656 244l40.823-40.823Q718 182 749 182.5t52 21.5l52 53q21 21 20.5 51t-21.463 50.963L811 400ZM136.327 957q-15.889 0-26.108-10.714Q100 935.571 100 920.689V816.062q0-7.062 2.5-13.562Q105 796 110 791l505-505 155 155-504 505q-6 6-12.217 8.5Q247.565 957 241 957H136.327ZM640 417l-27-27 53 53-26-26Z"/></svg>`;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('edit', sanitizer.bypassSecurityTrustHtml(this.EDIT_ICON));
  }
}
