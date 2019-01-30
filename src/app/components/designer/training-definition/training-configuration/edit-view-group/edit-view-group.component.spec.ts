import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditViewGroupComponent } from './edit-view-group.component';

describe('EditViewGroupComponent', () => {
  let component: EditViewGroupComponent;
  let fixture: ComponentFixture<EditViewGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditViewGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditViewGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
