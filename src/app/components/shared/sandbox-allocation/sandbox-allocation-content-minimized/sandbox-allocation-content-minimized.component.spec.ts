import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxAllocationContentMinimizedComponent } from './sandbox-allocation-content-minimized.component';

describe('SandboxAllocationContentMinimizedComponent', () => {
  let component: SandboxAllocationContentMinimizedComponent;
  let fixture: ComponentFixture<SandboxAllocationContentMinimizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxAllocationContentMinimizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxAllocationContentMinimizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
