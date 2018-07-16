import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxDefinitionComponent } from './sandbox-definition.component';

describe('SandboxDefinitionComponent', () => {
  let component: SandboxDefinitionComponent;
  let fixture: ComponentFixture<SandboxDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
