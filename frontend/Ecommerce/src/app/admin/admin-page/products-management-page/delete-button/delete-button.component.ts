import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.sass']
})
export class DeleteButtonComponent {
  @Input() isDisabled: boolean = false

  DELETE_BUTTON = `<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M295.309-140.001q-31.958 0-54.133-22.175-22.175-22.175-22.175-54.133V-714h-10q-12.769 0-22.384-9.615-9.616-9.615-9.616-22.384t9.616-22.384q9.615-9.616 22.576-9.616H361q0-15.076 11.538-26.23 11.539-11.154 26.616-11.154h160.692q15.077 0 26.616 11.154Q598-793.075 598-777.999h151.807q12.961 0 22.576 9.616 9.616 9.615 9.616 22.384t-9.616 22.384Q762.768-714 749.999-714h-10v497.691q0 31.958-22.175 54.133-22.175 22.175-54.133 22.175H295.309ZM283-714v497.691q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462h368.382q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847V-714H283Zm91.155 394.001q0 12.769 9.615 22.384T406.154-288q12.769 0 22.384-9.615 9.616-9.615 9.616-22.384v-278.002q0-12.769-9.616-22.384Q418.923-630 406.154-630t-22.384 9.615q-9.615 9.615-9.615 22.384v278.002Zm146.691 0q0 12.769 9.616 22.384Q540.077-288 552.846-288t22.384-9.615q9.615-9.615 9.615-22.384v-278.002q0-12.769-9.615-22.384T552.846-630q-12.769 0-22.384 9.615-9.616 9.615-9.616 22.384v278.002ZM283-714v497.691q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462H283v-510Z"/></svg>`;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIconLiteral('delete', this.sanitizer.bypassSecurityTrustHtml(this.DELETE_BUTTON));
  }
}
