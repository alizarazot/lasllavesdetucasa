import { Component } from '@angular/core';

import { OmnibarItem } from '../omnibar-item/omnibar-item';

@Component({
  selector: 'app-omnibar',
  imports: [OmnibarItem],
  templateUrl: './omnibar.html',
})
export class Omnibar {}
