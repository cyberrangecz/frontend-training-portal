import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelConfigurationComponent } from './level-configuration.component';

describe('LevelConfigurationComponent', () => {
  let component: LevelConfigurationComponent;
  let fixture: ComponentFixture<LevelConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
