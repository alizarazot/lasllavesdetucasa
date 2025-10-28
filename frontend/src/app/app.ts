import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CardRealState } from './card-real-state/card-real-state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardRealState],
  templateUrl: './app.html',
})
export class App {
  numItems = [...Array(1024).keys()];
  protected readonly title = signal('frontend');
}
