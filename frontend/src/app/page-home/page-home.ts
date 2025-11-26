import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CardRealState } from '../card-real-state/card-real-state';
import { SearchBar } from '../search-bar/search-bar';
import { PROPERTIES } from '../data/properties.data';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [RouterLink, CardRealState, SearchBar],
  templateUrl: './page-home.html',
})
export class PageHome {
  properties = PROPERTIES;
  showFixedHeader = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showFixedHeader = window.scrollY > window.innerHeight - 100;
  }
}
