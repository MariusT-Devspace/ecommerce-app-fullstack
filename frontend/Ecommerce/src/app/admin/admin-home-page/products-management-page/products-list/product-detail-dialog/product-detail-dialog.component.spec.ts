import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailDialogComponent } from './product-detail-dialog.component';

describe('ProductDetailDialogComponent', () => {
  let component: ProductDetailDialogComponent;
  let fixture: ComponentFixture<ProductDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
