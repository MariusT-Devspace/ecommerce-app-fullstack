import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteCategoryDialogComponent } from './confirm-delete-category-dialog.component';

describe('ConfirmDeleteCategoryDialogComponent', () => {
  let component: ConfirmDeleteCategoryDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteCategoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteCategoryDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmDeleteCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
