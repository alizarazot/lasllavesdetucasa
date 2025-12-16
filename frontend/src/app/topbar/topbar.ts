import { Component, output, signal, OnInit, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Location } from '@angular/common';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
})
export class Topbar implements OnInit {
  router = inject(Router);

  hasSignIn = signal(false);
  pfpUrl = signal('');
  filtersClick = output<void>();

  showBackToHome = input(true);
  showDebug = input(false);

  location = inject(Location);

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

  goBack() {
    this.location.back();
  }
}
