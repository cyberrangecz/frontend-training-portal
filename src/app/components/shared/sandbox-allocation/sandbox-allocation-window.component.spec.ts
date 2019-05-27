import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxAllocationWindowComponent } from './sandbox-allocation-window.component';

describe('SandboxAllocationWindowComponent', () => {
  let component: SandboxAllocationWindowComponent;
  let fixture: ComponentFixture<SandboxAllocationWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxAllocationWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxAllocationWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
