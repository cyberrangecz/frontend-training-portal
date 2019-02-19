import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveConfirmationDialogComponent } from './leave-confirmation-dialog.component';

describe('LeaveConfirmationDialogComponent', () => {
  let component: LeaveConfirmationDialogComponent;
  let fixture: ComponentFixture<LeaveConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
