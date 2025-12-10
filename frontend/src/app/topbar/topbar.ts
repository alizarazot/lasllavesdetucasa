import { Component, output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
})
export class Topbar {
  filtersClick = output<void>();
}
