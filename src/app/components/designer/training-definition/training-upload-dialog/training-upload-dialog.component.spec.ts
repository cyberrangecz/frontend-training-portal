import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingUploadDialogComponent } from './training-upload-dialog.component';

describe('TrainingUploadDialogComponent', () => {
  let component: TrainingUploadDialogComponent;
  let fixture: ComponentFixture<TrainingUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
