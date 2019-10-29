import { NgModule } from '@angular/core';
import { NgMaterialInputSpinnerComponent } from './ng-material-input-spinner.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NgMaterialInputSpinnerComponent],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [NgMaterialInputSpinnerComponent]
})
export class NgMaterialInputSpinnerModule { }
