import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPopupComponent } from './producto-popup.component';

describe('ProductoPopupComponent', () => {
  let component: ProductoPopupComponent;
  let fixture: ComponentFixture<ProductoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
