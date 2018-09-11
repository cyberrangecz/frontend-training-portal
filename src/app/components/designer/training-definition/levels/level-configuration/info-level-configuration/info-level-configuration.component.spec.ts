import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLevelConfigurationComponent } from './info-level-configuration.component';

describe('InfoLevelConfigurationComponent', () => {
  let component: InfoLevelConfigurationComponent;
  let fixture: ComponentFixture<InfoLevelConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoLevelConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoLevelConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
