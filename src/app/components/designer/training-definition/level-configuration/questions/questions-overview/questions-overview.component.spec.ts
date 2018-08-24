import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsOverviewComponent } from './questions-overview.component';

describe('QuestionsOverviewComponent', () => {
  let component: QuestionsOverviewComponent;
  let fixture: ComponentFixture<QuestionsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
