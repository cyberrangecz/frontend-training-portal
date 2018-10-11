import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizersPickerComponent } from './organizers-picker.component';

describe('OrganizersPickerComponent', () => {
  let component: OrganizersPickerComponent;
  let fixture: ComponentFixture<OrganizersPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizersPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizersPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
