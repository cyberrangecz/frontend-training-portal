import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsListDialogComponent } from './authors-list-dialog.component';

describe('AuthorsListDialogComponent', () => {
  let component: AuthorsListDialogComponent;
  let fixture: ComponentFixture<AuthorsListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
