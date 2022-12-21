import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule} from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCommonModule,
    MatGridListModule
  ],
  exports: [
    MatCardModule,
    MatCommonModule,
    MatGridListModule,
    LayoutModule,
    MatFormFieldModule
  ]
})
export class SharedModule { }
