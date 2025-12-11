import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

import { app } from '../firebase';
import { Button } from '../button/button';
console.log(app);

@Component({
  selector: 'app-page-login',
  imports: [Button],
  templateUrl: './page-login.html',
})
export class PageLogin implements OnInit {
  pfpUrl = signal('');
  name = signal('');
  email = signal('');

  ngOnInit() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.name.set(user.providerData[0].displayName ?? user.providerData[0].email ?? '');
        this.pfpUrl.set(user.providerData[0].photoURL ?? '');
        this.email.set(user.providerData[0].email ?? '');
      } else {
        this.name.set('');
        this.pfpUrl.set('');
        this.email.set('');
      }
      console.log(this.name());
    });
  }

  async doLogin() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    auth.useDeviceLanguage();

    const signIn = await signInWithPopup(auth, provider);
    console.log(signIn.user);
  }

  async doLogOut() {
    getAuth().signOut();
  }
}
