import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPreviewComponent } from './training-preview.component';

describe('TrainingPreviewComponent', () => {
  let component: TrainingPreviewComponent;
  let fixture: ComponentFixture<TrainingPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
