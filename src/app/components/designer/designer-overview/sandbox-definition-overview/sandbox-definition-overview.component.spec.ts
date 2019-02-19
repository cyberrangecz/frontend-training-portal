import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxDefinitionOverviewComponent } from './sandbox-definition-overview.component';

describe('SandboxDefinitionOverviewComponent', () => {
  let component: SandboxDefinitionOverviewComponent;
  let fixture: ComponentFixture<SandboxDefinitionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxDefinitionOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxDefinitionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
