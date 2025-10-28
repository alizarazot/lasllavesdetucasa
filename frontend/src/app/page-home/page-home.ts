import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CardRealState } from '../card-real-state/card-real-state';

@Component({
  selector: 'app-page-home',
  imports: [RouterLink, CardRealState],
  templateUrl: './page-home.html',
})
export class PageHome {
  numItems = [...Array(1024).keys()];
}
