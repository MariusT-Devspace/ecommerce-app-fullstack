import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCommonModule} from '@angular/material/core';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCommonModule
  ],
  exports: [
    MatCardModule,
    MatCommonModule
  ]
})
export class SharedModule { }
