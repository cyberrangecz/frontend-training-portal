import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedMatchingItemsComponent } from './extended-matching-items.component';

describe('ExtendedMatchingItemsComponent', () => {
  let component: ExtendedMatchingItemsComponent;
  let fixture: ComponentFixture<ExtendedMatchingItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedMatchingItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedMatchingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
