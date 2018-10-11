import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDefinitionPickerComponent } from './training-definition-picker.component';

describe('TrainingDefinitionPickerComponent', () => {
  let component: TrainingDefinitionPickerComponent;
  let fixture: ComponentFixture<TrainingDefinitionPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingDefinitionPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDefinitionPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
