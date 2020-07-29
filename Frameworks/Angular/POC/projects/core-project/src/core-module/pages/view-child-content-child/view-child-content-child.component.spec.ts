import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChildContentChildComponent } from './view-child-content-child.component';

describe('ViewChildContentChildComponent', () => {
  let component: ViewChildContentChildComponent;
  let fixture: ComponentFixture<ViewChildContentChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChildContentChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChildContentChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
