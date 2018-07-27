import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDeleteDialogComponent } from './training-delete-dialog.component';

describe('TrainingDeleteDialogComponent', () => {
  let component: TrainingDeleteDialogComponent;
  let fixture: ComponentFixture<TrainingDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
