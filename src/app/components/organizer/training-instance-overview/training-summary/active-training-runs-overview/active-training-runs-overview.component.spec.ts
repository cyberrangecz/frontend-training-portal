import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTrainingRunsOverviewComponent } from './active-training-runs-overview.component';

describe('ActiveTrainingRunsOverviewComponent', () => {
  let component: ActiveTrainingRunsOverviewComponent;
  let fixture: ComponentFixture<ActiveTrainingRunsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveTrainingRunsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTrainingRunsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
