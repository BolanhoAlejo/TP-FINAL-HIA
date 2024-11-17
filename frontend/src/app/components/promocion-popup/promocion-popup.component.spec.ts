import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionPopupComponent } from './promocion-popup.component';

describe('PromocionPopupComponent', () => {
  let component: PromocionPopupComponent;
  let fixture: ComponentFixture<PromocionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromocionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
