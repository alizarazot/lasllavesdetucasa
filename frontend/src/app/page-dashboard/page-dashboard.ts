import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
  imports: [ReactiveFormsModule, Topbar, Omnibar, CardRealState],
  templateUrl: './page-dashboard.html',
})
export class PageDashboard implements OnInit {
  realStates: WritableSignal<RealState[]> = signal([]);

  showFiltersModal = signal(true);

  bedroomMax = new FormControl(0);
  bedroomMin = new FormControl(-1);
  bathroomMax = new FormControl(0);
  bathroomMin = new FormControl(-1);
  priceMax = new FormControl(0);
  priceMin = new FormControl(-1);
  hasParking = new FormControl(false);

  async ngOnInit() {
    const query = await fetch(window.location.origin + '/real-states');
    this.realStates.set(await query.json());
    console.log(this.realStates());
  }

  toggleFilters() {
    this.showFiltersModal.set(!this.showFiltersModal());
  }
}
