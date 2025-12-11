import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topbar } from '../topbar/topbar';
import { Button } from '../button/button';

interface RealState {
  id: number;
  title: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  hasParking: boolean;
  price: number;
}

@Component({
  selector: 'app-page-buy',
  imports: [Topbar, Button],
  templateUrl: './page-buy.html',
})
export class PageBuy implements OnInit {
  router = inject(Router);

  id = inject(ActivatedRoute);
  realState = signal<RealState>({
    id: 0,
    title: '',
    description: '',
    bedrooms: 0,
    bathrooms: 0,
    hasParking: false,
    price: 0,
  });

  async ngOnInit() {
    console.log('hesy');
    const query = await fetch(
      window.location.origin + '/real-state/' + this.id.snapshot.paramMap.get('id')?.toString(),
    );
    this.realState.set(await query.json());
  }

  showContract() {
    window.open(window.location.origin + '/contract.pdf', '_blank');
  }

  navigateContractSummary() {
    window.open(
      this.router.serializeUrl(this.router.createUrlTree(['/contract-summary'])),
      '_blank',
    );
  }
}
