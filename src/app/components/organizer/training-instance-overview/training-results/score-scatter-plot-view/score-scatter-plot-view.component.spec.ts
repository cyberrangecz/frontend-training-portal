import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreScatterPlotViewComponent } from './score-scatter-plot-view.component';

describe('ScoreScatterPlotViewComponent', () => {
  let component: ScoreScatterPlotViewComponent;
  let fixture: ComponentFixture<ScoreScatterPlotViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreScatterPlotViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreScatterPlotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
