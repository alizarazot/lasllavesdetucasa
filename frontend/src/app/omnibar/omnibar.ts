import { Component, input, output } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { OmnibarItem } from '../omnibar-item/omnibar-item';

@Component({
  selector: 'app-omnibar',
  imports: [OmnibarItem, ReactiveFormsModule],
  templateUrl: './omnibar.html',
})
export class Omnibar {
  userDescription = new FormControl('');
  makeFilters = output<string>();

  bedroomMax = input(0);
  bedroomMin = input(-1);

  bathroomMax = input(0);
  bathroomMin = input(-1);

  priceMax = input(0);
  priceMin = input(-1);

  hasParking = input(false);

  makeEventFilters() {
    this.makeFilters.emit(this.userDescription.value!);
  }
}
