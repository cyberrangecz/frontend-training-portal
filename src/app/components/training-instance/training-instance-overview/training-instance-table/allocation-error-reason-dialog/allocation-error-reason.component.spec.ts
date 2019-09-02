import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationErrorReasonComponent } from './allocation-error-reason.component';

describe('AllocationFailedReasonComponent', () => {
  let component: AllocationErrorReasonComponent;
  let fixture: ComponentFixture<AllocationErrorReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocationErrorReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationErrorReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
