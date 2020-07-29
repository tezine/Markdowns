import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VHooksComponent } from './vhooks.component';

describe('VHooksComponent', () => {
  let component: VHooksComponent;
  let fixture: ComponentFixture<VHooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VHooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VHooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
