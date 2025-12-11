import { Component, output, signal, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
