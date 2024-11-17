import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDeleteComponent } from './producto-delete.component';

describe('ProductoDeleteComponent', () => {
  let component: ProductoDeleteComponent;
  let fixture: ComponentFixture<ProductoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
