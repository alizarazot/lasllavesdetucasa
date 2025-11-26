import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../data/properties.data';
import { ReplacePipe } from '../pipes/replace.pipe';

@Component({
  selector: 'app-card-real-state',
  standalone: true,
  imports: [CommonModule, ReplacePipe],
  templateUrl: './card-real-state.html',
  styleUrl: './card-real-state.css',
})
export class CardRealState {
  @Input() property!: Property;
}
