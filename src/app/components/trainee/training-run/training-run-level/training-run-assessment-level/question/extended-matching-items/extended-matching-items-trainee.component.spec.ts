import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedMatchingItemsTraineeComponent } from './extended-matching-items-trainee.component';

describe('ExtendedMatchingItemsTraineeComponent', () => {
  let component: ExtendedMatchingItemsTraineeComponent;
  let fixture: ComponentFixture<ExtendedMatchingItemsTraineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedMatchingItemsTraineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedMatchingItemsTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
