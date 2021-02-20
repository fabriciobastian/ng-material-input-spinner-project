import { Component, OnDestroy, HostBinding, Input, Optional, Self, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { RepeatAction } from './repeat-action';

@Component({
  selector: 'ng-material-input-spinner',
  templateUrl: './ng-material-input-spinner.component.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: NgMaterialInputSpinnerComponent
    }
  ],
  styleUrls: ['./ng-material-input-spinner.component.scss']
})
export class NgMaterialInputSpinnerComponent implements ControlValueAccessor, MatFormFieldControl<number>, OnDestroy {
  step = 0.01;
  digits = 0;

  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'ng-material-input-spinner';

  spinnerDisabled = false;

  onChange: any = (value: number) => {};
  onTouch: any = (value: number) => {};

  static nextId = 0;
  @HostBinding() id = `ng-material-input-spinner-${NgMaterialInputSpinnerComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(required: any) {
    this._required = !!required;
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }
  private _placeholder: string;

  set value(value: number) {
    this._value = value;
    this.onTouch(this._value);
    this.onChange(this._value);
    this.stateChanges.next();
  } 
  get value(): number {
    return this._value;
  }
  private _value: number;

  get empty(): boolean {
    return this.value === void 0 || this.value === null;
  }

  get errorState(): boolean {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.stateChanges.next();
  }
  private _disabled = false;

  private incrementAction: RepeatAction;
  private decrementAction: RepeatAction;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>) {

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    focusMonitor.monitor(elementRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });

    const numberComponents = this.step.toString().split('.');
    this.digits = numberComponents.length > 1 ? numberComponents[numberComponents.length - 1].length : 0;

    this.incrementAction = new RepeatAction(() => { this.increment(); });
    this.decrementAction = new RepeatAction(() => { this.decrement(); });
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    this.stateChanges.complete();
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elementRef.nativeElement.querySelector('input').focus();
    }
  }

  onInputChange(event): void {
    const newValue = event.target.value;
    if (newValue === '') {
      this.value = void 0;
      this.spinnerDisabled = true;
      return;
    }

    this.spinnerDisabled = this.disabled;
    this.value = this.roundToClosestStep(+newValue);
  }

  onMouseDownIncrement(): void {
    this.incrementAction.start();
  }

  onMouseUpIncrement(): void {
    this.incrementAction.stop();
    this.increment();
  }

  onMouseOutIncrement(): void {
    this.incrementAction.stop();
  }

  onMouseDownDecrement(): void {
    this.decrementAction.start();
  }

  onMouseUpDecrement(): void {
    this.decrementAction.stop();
    this.decrement();
  }

  onMouseOutDecrement(): void {
    this.decrementAction.stop();
  }

  private increment(): void {
    this.value = +(this._value + this.step).toFixed(this.digits);
  }

  private decrement(): void {
    this.value = +(this._value - this.step).toFixed(this.digits);
  }

  writeValue(value: number): void {
    if (!value) {
      this._value = void 0;
      this.spinnerDisabled = true;
      return;
    }

    this.spinnerDisabled = this.disabled;
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private roundToClosestStep(value: number): number {
    return +(this.step * Math.ceil(value / this.step)).toFixed(this.digits);
  }
}
