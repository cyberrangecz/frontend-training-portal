import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingEditPopupComponent } from './training-edit-popup.component';

describe('TrainingEditPopupComponent', () => {
  let component: TrainingEditPopupComponent;
  let fixture: ComponentFixture<TrainingEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
