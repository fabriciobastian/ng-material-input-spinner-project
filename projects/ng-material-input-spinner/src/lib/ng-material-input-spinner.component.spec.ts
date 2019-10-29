import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMaterialInputSpinnerComponent } from './ng-material-input-spinner.component';

describe('NgMaterialInputSpinnerComponent', () => {
  let component: NgMaterialInputSpinnerComponent;
  let fixture: ComponentFixture<NgMaterialInputSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMaterialInputSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMaterialInputSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
