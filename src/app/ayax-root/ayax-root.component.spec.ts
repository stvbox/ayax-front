import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyaxRootComponent } from './ayax-root.component';

describe('AyaxRootComponent', () => {
  let component: AyaxRootComponent;
  let fixture: ComponentFixture<AyaxRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyaxRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyaxRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
