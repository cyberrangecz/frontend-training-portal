import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxUploadDialogComponent } from './sandbox-upload-dialog.component';

describe('SandboxUploadDialogComponent', () => {
  let component: SandboxUploadDialogComponent;
  let fixture: ComponentFixture<SandboxUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
