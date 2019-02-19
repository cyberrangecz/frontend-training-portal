import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLevelConfigurationComponent } from './game-level-configuration.component';

describe('GameLevelConfigurationComponent', () => {
  let component: GameLevelConfigurationComponent;
  let fixture: ComponentFixture<GameLevelConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLevelConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLevelConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
