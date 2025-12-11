import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBuy } from './page-buy';

describe('PageBuy', () => {
  let component: PageBuy;
  let fixture: ComponentFixture<PageBuy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageBuy],
    }).compileComponents();

    fixture = TestBed.createComponent(PageBuy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
