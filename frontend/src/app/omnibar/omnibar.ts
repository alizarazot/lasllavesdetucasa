import { Component, input } from '@angular/core';

import { OmnibarItem } from '../omnibar-item/omnibar-item';

@Component({
  selector: 'app-omnibar',
  imports: [OmnibarItem],
  templateUrl: './omnibar.html',
})
export class Omnibar {
  bedroomMax = input(0);
  bedroomMin = input(-1);

  bathroomMax = input(0);
  bathroomMin = input(-1);

  priceMax = input(0);
  priceMin = input(-1);

  hasParking = input(false);
}
