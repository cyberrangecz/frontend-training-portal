import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerOverviewComponent } from './designer-overview.component';

describe('DesignerOverviewComponent', () => {
  let component: DesignerOverviewComponent;
  let fixture: ComponentFixture<DesignerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignerOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
