import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTokenDetailComponent } from './access-token-detail.component';

describe('AccessTokenDetailComponent', () => {
  let component: AccessTokenDetailComponent;
  let fixture: ComponentFixture<AccessTokenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessTokenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessTokenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
