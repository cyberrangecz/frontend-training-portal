import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreDevelopmentViewComponent } from './score-development-view.component';

describe('ScoreDevelopmentViewComponent', () => {
  let component: ScoreDevelopmentViewComponent;
  let fixture: ComponentFixture<ScoreDevelopmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreDevelopmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreDevelopmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
