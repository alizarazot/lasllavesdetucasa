import { Component, input } from '@angular/core';

@Component({
  selector: 'app-omnibar-item',
  templateUrl: './omnibar-item.html',
})
export class OmnibarItem {
  upper = input(-1);
  lower = input(-1);
  required = input(false);
}
