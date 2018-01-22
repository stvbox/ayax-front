import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtorsDetailComponent } from './realtors-detail.component';

describe('RealtorsDetailComponent', () => {
  let component: RealtorsDetailComponent;
  let fixture: ComponentFixture<RealtorsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtorsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
