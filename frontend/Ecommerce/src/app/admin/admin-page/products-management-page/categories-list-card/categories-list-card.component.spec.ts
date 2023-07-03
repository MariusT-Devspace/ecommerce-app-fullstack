import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListCardComponent } from './categories-list-card.component';

describe('CategoriesListCardComponent', () => {
  let component: CategoriesListCardComponent;
  let fixture: ComponentFixture<CategoriesListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
