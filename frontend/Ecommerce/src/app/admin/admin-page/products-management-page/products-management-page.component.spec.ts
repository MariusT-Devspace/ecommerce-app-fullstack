import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsManagementPageComponent } from './products-management-page.component';

describe('ProductsManagementPageComponent', () => {
  let component: ProductsManagementPageComponent;
  let fixture: ComponentFixture<ProductsManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsManagementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
