import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoryButtonComponent } from './new-category-button.component';

describe('NewCategoryButtonComponent', () => {
  let component: NewCategoryButtonComponent;
  let fixture: ComponentFixture<NewCategoryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCategoryButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCategoryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
