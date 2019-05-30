import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneDialogComponent } from './clone-dialog.component';

describe('CloneDialogComponent', () => {
  let component: CloneDialogComponent;
  let fixture: ComponentFixture<CloneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloneDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
