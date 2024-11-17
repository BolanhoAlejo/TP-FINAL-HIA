import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionDeleteComponent } from './promocion-delete.component';

describe('PromocionDeleteComponent', () => {
  let component: PromocionDeleteComponent;
  let fixture: ComponentFixture<PromocionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromocionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
