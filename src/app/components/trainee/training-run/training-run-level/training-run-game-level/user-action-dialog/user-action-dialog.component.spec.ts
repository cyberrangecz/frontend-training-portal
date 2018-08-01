import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionDialogComponent } from './user-action-dialog.component';

describe('UserActionDialogComponent', () => {
  let component: UserActionDialogComponent;
  let fixture: ComponentFixture<UserActionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
