import { Component, input } from '@angular/core';

import { OmnibarItem } from '../omnibar-item/omnibar-item';

@Component({
  selector: 'app-omnibar',
  imports: [OmnibarItem],
  templateUrl: './omnibar.html',
})
export class Omnibar {
  bedroomMax = input(null);
  bedroomMin = input(null);

  bathroomMax = input(null);
  bathroomMin = input(null);

  priceMax = input(null);
  priceMin = input(null);

  hasParking = input(false);
}
