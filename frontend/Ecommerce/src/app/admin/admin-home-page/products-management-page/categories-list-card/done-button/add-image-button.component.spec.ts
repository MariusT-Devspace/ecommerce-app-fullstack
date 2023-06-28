import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageButtonComponent } from './add-image-button.component';

describe('AddImageButtonComponent', () => {
  let component: AddImageButtonComponent;
  let fixture: ComponentFixture<AddImageButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddImageButtonComponent]
    });
    fixture = TestBed.createComponent(AddImageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
