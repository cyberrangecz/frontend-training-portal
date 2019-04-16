import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxAllocationContentMaximizedComponent } from './sandbox-allocation-content-maximized.component';

describe('SandboxAllocationContentMaximizedComponent', () => {
  let component: SandboxAllocationContentMaximizedComponent;
  let fixture: ComponentFixture<SandboxAllocationContentMaximizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxAllocationContentMaximizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxAllocationContentMaximizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
