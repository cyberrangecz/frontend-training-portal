import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedTrainingRunsOverviewComponent } from './archived-training-runs-overview.component';

describe('ArchivedTrainingRunsOverviewComponent', () => {
  let component: ArchivedTrainingRunsOverviewComponent;
  let fixture: ComponentFixture<ArchivedTrainingRunsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedTrainingRunsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedTrainingRunsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
