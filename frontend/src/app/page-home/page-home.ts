import { Component } from '@angular/core';

import { CardRealState } from '../card-real-state/card-real-state';

@Component({
  selector: 'app-page-home',
  imports: [CardRealState],
  templateUrl: './page-home.html',
})
export class PageHome {
  numItems = [...Array(1024).keys()];
}
