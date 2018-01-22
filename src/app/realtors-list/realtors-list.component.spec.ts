import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtorsListComponent } from './realtors-list.component';

describe('RealtorsListComponent', () => {
  let component: RealtorsListComponent;
  let fixture: ComponentFixture<RealtorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
