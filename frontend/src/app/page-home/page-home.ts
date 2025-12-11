import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { PageDashboard } from '../page-dashboard/page-dashboard';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-page-home',
  imports: [PageDashboard],
  templateUrl: './page-home.html',
})
export class PageHome implements OnInit {
  router = inject(Router);

  hasSignIn = signal(false);
  pfpUrl = signal('');

  ngOnInit() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.pfpUrl.set(user.providerData[0].photoURL ?? '');
        this.hasSignIn.set(true);
      } else {
        this.hasSignIn.set(false);
        this.pfpUrl.set('');
      }
    });
  }
}
