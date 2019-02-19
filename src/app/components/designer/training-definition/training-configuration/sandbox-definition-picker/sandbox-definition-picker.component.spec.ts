import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxDefinitionPickerComponent } from './sandbox-definition-picker.component';

describe('SandboxDefinitionPickerComponent', () => {
  let component: SandboxDefinitionPickerComponent;
  let fixture: ComponentFixture<SandboxDefinitionPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxDefinitionPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxDefinitionPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
