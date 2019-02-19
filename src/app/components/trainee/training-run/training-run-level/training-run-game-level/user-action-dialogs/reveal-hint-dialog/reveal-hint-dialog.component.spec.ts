import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealHintDialogComponent } from './reveal-hint-dialog.component';

describe('RevealHintDialogComponent', () => {
  let component: RevealHintDialogComponent;
  let fixture: ComponentFixture<RevealHintDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevealHintDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealHintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
