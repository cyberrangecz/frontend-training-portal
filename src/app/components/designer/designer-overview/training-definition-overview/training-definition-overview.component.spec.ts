import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDefinitionOverviewComponent } from './training-definition-overview.component';

describe('TrainingDefinitionOverviewComponent', () => {
  let component: TrainingDefinitionOverviewComponent;
  let fixture: ComponentFixture<TrainingDefinitionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingDefinitionOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDefinitionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
