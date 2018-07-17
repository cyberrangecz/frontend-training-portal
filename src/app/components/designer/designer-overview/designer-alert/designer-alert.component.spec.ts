import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerAlertComponent } from './designer-alert.component';

describe('DesignerAlertComponent', () => {
  let component: DesignerAlertComponent;
  let fixture: ComponentFixture<DesignerAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignerAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
