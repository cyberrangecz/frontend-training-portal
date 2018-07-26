import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingInstanceDefinitionComponent } from './training-instance-definition.component';

describe('TrainingInstanceDefinitionComponent', () => {
  let component: TrainingInstanceDefinitionComponent;
  let fixture: ComponentFixture<TrainingInstanceDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingInstanceDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingInstanceDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
