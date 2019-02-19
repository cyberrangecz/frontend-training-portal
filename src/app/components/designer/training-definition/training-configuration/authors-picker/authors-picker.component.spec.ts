import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsPickerComponent } from './authors-picker.component';

describe('AuthorsPickerComponent', () => {
  let component: AuthorsPickerComponent;
  let fixture: ComponentFixture<AuthorsPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
