import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongFlagDialogComponent } from './wrong-flag-dialog.component';

describe('WrongFlagDialogComponent', () => {
  let component: WrongFlagDialogComponent;
  let fixture: ComponentFixture<WrongFlagDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongFlagDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongFlagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
