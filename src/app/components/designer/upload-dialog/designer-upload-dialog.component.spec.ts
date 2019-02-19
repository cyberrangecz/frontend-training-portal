import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerUploadDialogComponent } from './designer-upload-dialog.component';

describe('DesignerUploadDialogComponent', () => {
  let component: DesignerUploadDialogComponent;
  let fixture: ComponentFixture<DesignerUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignerUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
