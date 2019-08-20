import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationErrorDialogComponent } from './allocation-error-dialog.component';

describe('AllocationFailedReasonComponent', () => {
  let component: AllocationErrorDialogComponent;
  let fixture: ComponentFixture<AllocationErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocationErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
