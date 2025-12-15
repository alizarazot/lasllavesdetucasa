import { Component, computed, OnInit, signal, WritableSignal, Signal, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { Topbar } from '../topbar/topbar';
import { Omnibar } from '../omnibar/omnibar';
import { CardRealState } from '../card-real-state/card-real-state';
import { Router } from '@angular/router';
import { Button } from '../button/button';

interface RealState {
  id: number;
  title: string;
  bedrooms: number;
  bathrooms: number;
  hasParking: boolean;
  price: number;
}

interface Filters {
  bedroomMax: number;
  bedroomMin: number;
  bathroomMax: number;
  bathroomMin: number;
  priceMax: number;
  priceMin: number;
  hasParking: boolean;
}

@Component({
  selector: 'app-page-dashboard',
  imports: [ReactiveFormsModule, Topbar, Omnibar, CardRealState, Button, FormsModule],
  templateUrl: './page-dashboard.html',
})
export class PageDashboard implements OnInit {
  router = inject(Router);

  realStates: WritableSignal<RealState[]> = signal([]);
  realStatesProcessed: Signal<RealState[]> = computed(() =>
    this.realStates().filter((realState) => {
      if (this.bedroomMaxSignal()! > 0 && realState.bedrooms > this.bedroomMaxSignal()!) {
        return false;
      }
      if (this.bedroomMinSignal()! > -1 && realState.bedrooms < this.bedroomMinSignal()!) {
        return false;
      }
      if (this.bathroomMaxSignal()! > 0 && realState.bathrooms > this.bathroomMaxSignal()!) {
        return false;
      }
      if (this.bathroomMinSignal()! > 0 && realState.bathrooms < this.bathroomMinSignal()!) {
        return false;
      }
      if (this.priceMaxSignal()! > 0 && realState.price > this.priceMaxSignal()!) {
        return false;
      }
      if (this.priceMinSignal()! > 0 && realState.price < this.priceMinSignal()!) {
        return false;
      }
      if (this.hasParkingSignal()! && !realState.hasParking) {
        return false;
      }

      return true;
    }),
  );

  showFiltersModal = signal(false);

  bedroomMax = new FormControl(0);
  bedroomMin = new FormControl(-1);
  bathroomMax = new FormControl(0);
  bathroomMin = new FormControl(-1);
  priceMax = new FormControl(0);
  priceMin = new FormControl(-1);
  hasParking = new FormControl(false);

  bedroomMaxSignal = toSignal(this.bedroomMax.valueChanges);
  bedroomMinSignal = toSignal(this.bedroomMin.valueChanges);
  bathroomMaxSignal = toSignal(this.bathroomMax.valueChanges);
  bathroomMinSignal = toSignal(this.bathroomMin.valueChanges);
  priceMaxSignal = toSignal(this.priceMax.valueChanges);
  priceMinSignal = toSignal(this.priceMin.valueChanges);
  hasParkingSignal = toSignal(this.hasParking.valueChanges);

  async ngOnInit() {
    // DEBUG: Delete later.
    console.log('Alter text fn:', this);

    const query = await fetch(window.location.origin + '/real-states');
    this.realStates.set(await query.json());
  }

  toggleFilters() {
    this.showFiltersModal.set(!this.showFiltersModal());
  }

  async processFilters(description: string) {
    console.log('Make filter:', description);

    const query = await fetch(
      window.location.origin +
        '/make-filters?' +
        new URLSearchParams({ description: description }).toString(),
    );

    const filters: Filters = await query.json();

    this.bedroomMax.setValue(filters.bedroomMax);
    this.bedroomMin.setValue(filters.bedroomMin);
    this.bathroomMax.setValue(filters.bathroomMax);
    this.bathroomMin.setValue(filters.bathroomMin);
    this.priceMax.setValue(filters.priceMax);
    this.priceMin.setValue(filters.priceMin);
    this.hasParking.setValue(filters.hasParking);

    console.log('Filtered!');
  }

  isChatbotOpen = signal(false);
  messages = signal<string[]>([]);
  messageInput = signal<string>('');

  async sendMessageToChatbot() {
    const msg = this.messageInput();
    this.messageInput.set('');
    this.messages.update((msgs) => [...msgs, msg, 'Waiting for response...']);

    const query = await fetch(
      window.location.origin + '/chatbot?' + new URLSearchParams({ message: msg }).toString(),
    );

    const responses: string[] = await query.json();

    this.messages.set(responses);
  }

  isAccesibilityOpen = signal(false);

  changePageZoom(delta: number) {
    if (delta === 0) {
      document.body.style.zoom = '1';
      return;
    }
    const currentZoom = document.body.style.zoom ? parseFloat(document.body.style.zoom) : 1;
    const newZoom = currentZoom + delta;
    document.body.style.zoom = newZoom.toString();
  }

  togglePageTextBold() {
    const currentWeight = document.body.style.fontWeight;
    document.body.style.fontWeight = currentWeight === 'bolder' ? 'normal' : 'bolder';
  }

  togglePageTextContrast() {
    let overlay = document.getElementById('before-body') as HTMLElement;

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'before-body';

      Object.assign(overlay.style, {
        position: 'fixed', // fixed > absolute for overlays
        inset: '0',
        zIndex: '9999',
        pointerEvents: 'none',
        backdropFilter: 'contrast(100%)',
      });

      document.body.appendChild(overlay);
    }

    overlay.style.backdropFilter =
      overlay.style.backdropFilter === 'contrast(200%)' ? 'contrast(100%)' : 'contrast(200%)';
  }
}
