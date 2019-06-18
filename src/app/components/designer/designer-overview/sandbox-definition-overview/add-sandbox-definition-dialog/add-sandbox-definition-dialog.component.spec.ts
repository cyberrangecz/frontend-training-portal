import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSandboxDefinitionDialogComponent } from './add-sandbox-definition-dialog.component';

describe('AddSandboxDefinitionDialogComponent', () => {
  let component: AddSandboxDefinitionDialogComponent;
  let fixture: ComponentFixture<AddSandboxDefinitionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSandboxDefinitionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSandboxDefinitionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
