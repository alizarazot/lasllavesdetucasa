import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRealState } from './card-real-state';

describe('CardRealState', () => {
  let component: CardRealState;
  let fixture: ComponentFixture<CardRealState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRealState],
    }).compileComponents();

    fixture = TestBed.createComponent(CardRealState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
