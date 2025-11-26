import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CardRealState } from '../card-real-state/card-real-state';
import { SearchBar } from '../search-bar/search-bar';
import { FilterPanel } from '../filter-panel/filter-panel';
import { PROPERTIES, Property } from '../data/properties.data';
import { PropertyFilters } from '../filter-panel/filters.interface';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [RouterLink, CardRealState, SearchBar, FilterPanel, CommonModule],
  templateUrl: './page-home.html',
})
export class PageHome {
  properties = PROPERTIES;
  filteredProperties = PROPERTIES;
  showFixedHeader = false;
  activeFilters: PropertyFilters = {};

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showFixedHeader = window.scrollY > window.innerHeight - 100;
  }

  onFiltersChanged(filters: PropertyFilters) {
    this.activeFilters = filters;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProperties = this.properties.filter(property => {
      // Price filter
      if (this.activeFilters.minPrice && property.price < this.activeFilters.minPrice) {
        return false;
      }
      if (this.activeFilters.maxPrice && property.price > this.activeFilters.maxPrice) {
        return false;
      }

      // Bedrooms filter
      if (this.activeFilters.bedrooms !== undefined && property.bedrooms < this.activeFilters.bedrooms) {
        return false;
      }

      // Bathrooms filter
      if (this.activeFilters.bathrooms !== undefined && property.bathrooms < this.activeFilters.bathrooms) {
        return false;
      }

      // Parking filter
      if (this.activeFilters.parking !== undefined && property.parking !== this.activeFilters.parking) {
        return false;
      }

      return true;
    });
  }

  removeFilter(filterKey: keyof PropertyFilters) {
    delete this.activeFilters[filterKey];
    this.applyFilters();
  }

  get hasActiveFilters(): boolean {
    return Object.keys(this.activeFilters).length > 0;
  }
}
