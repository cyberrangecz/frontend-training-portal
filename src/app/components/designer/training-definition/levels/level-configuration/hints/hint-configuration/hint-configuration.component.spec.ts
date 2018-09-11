import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HintConfigurationComponent } from './hint-configuration.component';

describe('HintConfigurationComponent', () => {
  let component: HintConfigurationComponent;
  let fixture: ComponentFixture<HintConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HintConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HintConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
