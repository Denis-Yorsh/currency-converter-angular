import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiCurrencyComponent } from './li-currency.component';

describe('LiCurrencyComponent', () => {
  let component: LiCurrencyComponent;
  let fixture: ComponentFixture<LiCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiCurrencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
