import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-material-input-spinner-project';
  numberGroup = new FormGroup({
    numberControl: new FormControl(9.5, [Validators.max(10), Validators.min(9)])
  });

  get numberControl(): FormControl {
    return this.numberGroup.controls.numberControl as FormControl;
  }

  setValueToTen() {
    this.numberGroup.controls.numberControl.setValue(10);
  }

  getErrorMessage() {
    return this.numberControl.errors.max ? 'Must be <= 10' :
           this.numberControl.errors.min ? 'Must be >= than 9' :
           '';
  }
}
