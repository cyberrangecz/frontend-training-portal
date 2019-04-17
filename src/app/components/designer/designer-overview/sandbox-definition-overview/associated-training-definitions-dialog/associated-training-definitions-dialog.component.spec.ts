import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedTrainingDefinitionsDialogComponent } from './associated-training-definitions-dialog.component';

describe('AssociatedTrainingDefinitionsDialogComponent', () => {
  let component: AssociatedTrainingDefinitionsDialogComponent;
  let fixture: ComponentFixture<AssociatedTrainingDefinitionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociatedTrainingDefinitionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedTrainingDefinitionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
