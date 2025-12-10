import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmnibarItem } from './omnibar-item';

describe('OmnibarItem', () => {
  let component: OmnibarItem;
  let fixture: ComponentFixture<OmnibarItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmnibarItem],
    }).compileComponents();

    fixture = TestBed.createComponent(OmnibarItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
