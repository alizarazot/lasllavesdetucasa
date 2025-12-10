import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Omnibar } from './omnibar';

describe('Omnibar', () => {
  let component: Omnibar;
  let fixture: ComponentFixture<Omnibar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Omnibar],
    }).compileComponents();

    fixture = TestBed.createComponent(Omnibar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
