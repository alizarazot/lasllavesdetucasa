import { Component, input } from '@angular/core';
import { ɵEmptyOutletComponent } from '@angular/router';

@Component({
  selector: 'app-omnibar-item',
  imports: [ɵEmptyOutletComponent],
  templateUrl: './omnibar-item.html',
})
export class OmnibarItem {
  upper = input(-1);
  lower = input(-1);
  required = input(false);
}
