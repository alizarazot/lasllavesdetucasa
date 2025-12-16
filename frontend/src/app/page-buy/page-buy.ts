import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topbar } from '../topbar/topbar';
import { Button } from '../button/button';
import { FormsModule } from '@angular/forms';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface RealState {
  id: number;
  title: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  hasParking: boolean;
  price: number;
}

@Component({
  selector: 'app-page-buy',
  imports: [Topbar, Button, FormsModule],
  templateUrl: './page-buy.html',
})
export class PageBuy implements OnInit {
  router = inject(Router);

  id = inject(ActivatedRoute);
  realState = signal<RealState>({
    id: 0,
    title: '',
    description: '',
    bedrooms: 0,
    bathrooms: 0,
    hasParking: false,
    price: 0,
  });

  async ngOnInit() {
    const query = await fetch(
      window.location.origin + '/real-state/' + this.id.snapshot.paramMap.get('id')?.toString(),
    );
    this.realState.set(await query.json());

    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.email.set(user.providerData[0].email ?? '');
      } else {
        this.email.set('');
      }
    });
  }

  showContract() {
    window.open(window.location.origin + '/contract.pdf', '_blank');
  }

  navigateContractSummary() {
    this.router.navigate(['/contract-summary']);
  }

  currentDate = new Date().toISOString().split('T')[0];
  currentHour = new Date(Math.ceil(Date.now() / 3600000) * 3600000).toTimeString().slice(0, 5);

  date = signal(this.currentDate);
  hour = signal(this.currentHour);
  email = signal('');

  text = signal('Schedule an appointment!');

  async sendEmail() {
    console.log('Sending email:', this.email(), this.date(), this.hour());

    this.text.set('Making appointment...');

    await fetch(
      window.location.origin +
        '/send-email/' +
        this.realState().id.toString() +
        '?' +
        new URLSearchParams({
          email: this.email(),
          date: this.date(),
          hour: this.hour(),
        }).toString(),
    );

    this.text.set('Check your email!');

    setTimeout(() => {
      this.text.set('Schedule an appointment!');
    }, 5000);
  }
}
