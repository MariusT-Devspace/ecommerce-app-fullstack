import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneButtonComponent } from './done-button.component';

describe('DoneButtonComponent', () => {
  let component: DoneButtonComponent;
  let fixture: ComponentFixture<DoneButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoneButtonComponent]
    });
    fixture = TestBed.createComponent(DoneButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
