import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VLazyComponent } from './vlazy.component';

describe('VLazyComponent', () => {
  let component: VLazyComponent;
  let fixture: ComponentFixture<VLazyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VLazyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
