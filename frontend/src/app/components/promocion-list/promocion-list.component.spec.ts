import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionListComponent } from './promocion-list.component';

describe('PromocionListComponent', () => {
  let component: PromocionListComponent;
  let fixture: ComponentFixture<PromocionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromocionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
