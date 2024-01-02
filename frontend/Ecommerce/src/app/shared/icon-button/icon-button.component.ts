import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconButton } from './icon-button.model';
import { IconButtonType } from './icon-button-type.enum';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.sass'
})
export class IconButtonComponent implements OnInit{
  @Input() button: IconButton = {
    icon: undefined,
    matButtonType: IconButtonType.MAT_BUTTON,
    color: undefined
  };
  @Input() ariaLabel: string = '';
  @Input() disabled: boolean = false;
  
  hasIcon = false

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.hasIcon = this.button.icon !== undefined ? true : false

    if(this.hasIcon) {
      this.iconRegistry.addSvgIconLiteral(
        this.button.icon!.iconName, 
        this.sanitizer.bypassSecurityTrustHtml(this.button.icon!.svgIcon)
      );
    }
  }
}
