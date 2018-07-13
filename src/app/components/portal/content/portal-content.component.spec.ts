import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalContentComponent } from './portal-content.component';

describe('PortalContentComponent', () => {
  let component: PortalContentComponent;
  let fixture: ComponentFixture<PortalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
