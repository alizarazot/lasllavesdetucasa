import { Component } from '@angular/core';

import { Topbar } from '../topbar/topbar';
import { Omnibar } from '../omnibar/omnibar';
import { CardRealState } from '../card-real-state/card-real-state';

@Component({
  selector: 'app-page-dashboard',
  imports: [Topbar, Omnibar, CardRealState],
  templateUrl: './page-dashboard.html',
})
export class PageDashboard {}
