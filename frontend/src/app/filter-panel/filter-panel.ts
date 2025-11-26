import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyFilters } from './filters.interface';

@Component({
    selector: 'app-filter-panel',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './filter-panel.html',
    styleUrl: './filter-panel.css',
})
export class FilterPanel {
    @Output() filtersChanged = new EventEmitter<PropertyFilters>();

    isOpen = false;

    filters: PropertyFilters = {};

    togglePanel() {
        this.isOpen = !this.isOpen;
    }

    applyFilters() {
        this.filtersChanged.emit(this.filters);
        this.isOpen = false;
    }

    clearFilters() {
        this.filters = {};
        this.filtersChanged.emit(this.filters);
    }
}
