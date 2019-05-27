import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxInstancesSubtableComponent } from './sandbox-instances-subtable.component';

describe('SandboxInstancesSubtableComponent', () => {
  let component: SandboxInstancesSubtableComponent;
  let fixture: ComponentFixture<SandboxInstancesSubtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxInstancesSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxInstancesSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
