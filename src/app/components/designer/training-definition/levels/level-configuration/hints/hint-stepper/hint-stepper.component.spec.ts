import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HintStepperComponent } from './hint-stepper.component';

describe('HintStepperComponent', () => {
  let component: HintStepperComponent;
  let fixture: ComponentFixture<HintStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HintStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HintStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
