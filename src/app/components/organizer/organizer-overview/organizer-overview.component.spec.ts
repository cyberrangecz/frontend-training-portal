import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerOverviewComponent } from './organizer-overview.component';

describe('OrganizerOverviewComponent', () => {
  let component: OrganizerOverviewComponent;
  let fixture: ComponentFixture<OrganizerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
