import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Button } from './button.model';
import { ButtonType } from './button-type.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.sass'
})
export class ButtonComponent implements OnInit{
  @Input() button: Button = {
    icon: undefined,
    ariaLabel: '',
    text: '',
    matButtonType: ButtonType.MAT_BUTTON,
    color: undefined
  }
  
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
