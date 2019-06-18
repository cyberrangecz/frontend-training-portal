import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDefinitionUploadDialogComponent } from './training-definition-upload-dialog.component';

describe('TrainingDefinitionUploadDialogComponent', () => {
  let component: TrainingDefinitionUploadDialogComponent;
  let fixture: ComponentFixture<TrainingDefinitionUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingDefinitionUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDefinitionUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
