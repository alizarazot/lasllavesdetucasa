import { Routes } from '@angular/router';

import { PageHome } from './page-home/page-home';
import { PageLogin } from './page-login/page-login';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PageHome, pathMatch: 'full' },
  { path: 'login', component: PageLogin, pathMatch: 'full' },
];
