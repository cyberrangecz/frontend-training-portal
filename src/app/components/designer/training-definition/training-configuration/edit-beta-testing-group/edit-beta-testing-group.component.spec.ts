import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBetaTestingGroupComponent } from './edit-beta-testing-group.component';

describe('EditBetaTestingGroupComponent', () => {
  let component: EditBetaTestingGroupComponent;
  let fixture: ComponentFixture<EditBetaTestingGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBetaTestingGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBetaTestingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
