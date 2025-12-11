import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContractSummary } from './page-contract-summary';

describe('PageContractSummary', () => {
  let component: PageContractSummary;
  let fixture: ComponentFixture<PageContractSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageContractSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(PageContractSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
