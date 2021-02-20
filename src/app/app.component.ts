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

  setValueToTen() {
    this.numberGroup.controls.numberControl.setValue(10);
  }
}
