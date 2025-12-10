import { Component, OnInit, signal, WritableSignal } from '@angular/core';

import { Topbar } from '../topbar/topbar';
import { Omnibar } from '../omnibar/omnibar';
import { CardRealState } from '../card-real-state/card-real-state';

interface RealState {
  id: number;
  title: string;
  bedrooms: number;
  bathrooms: number;
  hasParking: boolean;
  price: number;
  pictures: string[];
}

@Component({
  selector: 'app-page-dashboard',
  imports: [Topbar, Omnibar, CardRealState],
  templateUrl: './page-dashboard.html',
})
export class PageDashboard implements OnInit {
  realStates: WritableSignal<RealState[]> = signal([]);

  async ngOnInit() {
    const query = await fetch(window.location.origin + '/real-states');
    this.realStates.set(await query.json());
    console.log(this.realStates());
  }
}
