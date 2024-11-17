import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionUpdateFormComponent } from './promocion-update-form.component';

describe('PromocionUpdateFormComponent', () => {
  let component: PromocionUpdateFormComponent;
  let fixture: ComponentFixture<PromocionUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionUpdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromocionUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
