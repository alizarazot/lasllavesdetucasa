import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageDashboard } from '../page-dashboard/page-dashboard';

@Component({
  selector: 'app-page-home',
  imports: [RouterLink, PageDashboard],
  templateUrl: './page-home.html',
})
export class PageHome {
  numItems = [...Array(1024).keys()];
}
