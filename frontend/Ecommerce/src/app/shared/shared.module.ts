import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { MatListModule } from '@angular/material/list';
import { IconButtonComponent } from './icon-button/icon-button.component';

@NgModule({
  declarations: [
    ProgressSpinnerComponent,
    IconButtonComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCommonModule,
    MatGridListModule,
    MatDividerModule,
    MatProgressBarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule
  ],
  exports: [
    MatCardModule,
    MatCommonModule,
    MatGridListModule,
    LayoutModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressBarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    ProgressSpinnerComponent,
    MatListModule,
    IconButtonComponent
  ]
})
export class SharedModule { }
