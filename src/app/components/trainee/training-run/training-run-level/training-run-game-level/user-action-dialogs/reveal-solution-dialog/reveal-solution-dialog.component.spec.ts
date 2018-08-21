import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealSolutionDialogComponent } from './reveal-solution-dialog.component';

describe('RevealSolutionDialogComponent', () => {
  let component: RevealSolutionDialogComponent;
  let fixture: ComponentFixture<RevealSolutionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevealSolutionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealSolutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
