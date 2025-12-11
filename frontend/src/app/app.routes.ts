import { Routes } from '@angular/router';

import { PageHome } from './page-home/page-home';
import { PageLogin } from './page-login/page-login';
import { PageBuy } from './page-buy/page-buy';
import { PageContractSummary } from './page-contract-summary/page-contract-summary';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PageHome, pathMatch: 'full' },
  { path: 'login', component: PageLogin, pathMatch: 'full' },
  { path: 'buy', children: [{ path: ':id', component: PageBuy }], pathMatch: 'prefix' },
  { path: 'contract-summary', component: PageContractSummary, pathMatch: 'full' },
];
