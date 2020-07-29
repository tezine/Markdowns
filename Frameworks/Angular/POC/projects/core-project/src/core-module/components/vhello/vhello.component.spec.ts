import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VHelloComponent } from './vhello.component';

describe('VHelloComponent', () => {
  let component: VHelloComponent;
  let fixture: ComponentFixture<VHelloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VHelloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
