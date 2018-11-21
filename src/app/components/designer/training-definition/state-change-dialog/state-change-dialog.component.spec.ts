import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateChangeDialogComponent } from './state-change-dialog.component';

describe('StateChangeDialogComponent', () => {
  let component: StateChangeDialogComponent;
  let fixture: ComponentFixture<StateChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
