import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDefinitionComponent } from './training-definition.component';

describe('TrainingDefinitionComponent', () => {
  let component: TrainingDefinitionComponent;
  let fixture: ComponentFixture<TrainingDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
