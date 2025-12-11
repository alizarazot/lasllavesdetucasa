import { Component, input, output } from '@angular/core';

import { Button } from '../button/button';

@Component({
  selector: 'app-card-real-state',
  imports: [Button],
  templateUrl: './card-real-state.html',
})
export class CardRealState {
  buyRealState = output<number>();

  id = input(0);
  title = input('');
  bedrooms = input(0);
  bathrooms = input(0);
  hasParking = input(false);
  price = input(0);
}
