import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxAllocationPanelComponent } from './sandbox-allocation-panel.component';

describe('SandboxAllocationPanelComponent', () => {
  let component: SandboxAllocationPanelComponent;
  let fixture: ComponentFixture<SandboxAllocationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxAllocationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxAllocationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
