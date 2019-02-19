import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRunGameLevelComponent } from './training-run-game-level.component';

describe('TrainingRunGameLevelComponent', () => {
  let component: TrainingRunGameLevelComponent;
  let fixture: ComponentFixture<TrainingRunGameLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRunGameLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRunGameLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
