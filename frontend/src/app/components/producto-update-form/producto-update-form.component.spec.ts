import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoUpdateFormComponent } from './producto-update-form.component';

describe('ProductoUpdateFormComponent', () => {
  let component: ProductoUpdateFormComponent;
  let fixture: ComponentFixture<ProductoUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoUpdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
