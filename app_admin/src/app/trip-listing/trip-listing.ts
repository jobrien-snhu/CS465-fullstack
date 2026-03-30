import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, NgFor, TripCard, FormsModule],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripData],
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  filteredTrips: Trip[] = [];
  searchTerm: string = '';
  sortOption: string = '';
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authentication: Authentication,
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    this.tripData.getTrips().subscribe({
      next: (value: any) => {
        this.trips = value;
        this.applyFiltersAndSort();
        this.cdr.detectChanges();

        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } else {
          this.message = 'There were no trips retrieved from the database';
        }

        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      },
    });
  }

  applyFiltersAndSort(): void {
    let results = [...this.trips];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      results = results.filter(
        (trip) =>
          trip.name?.toLowerCase().includes(term) ||
          trip.description?.toLowerCase().includes(term) ||
          trip.resort?.toLowerCase().includes(term),
      );
    }

    if (this.sortOption === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'priceLow') {
      results.sort((a, b) => parseFloat(a.perPerson) - parseFloat(b.perPerson));
    } else if (this.sortOption === 'priceHigh') {
      results.sort((a, b) => parseFloat(b.perPerson) - parseFloat(a.perPerson));
    } else if (this.sortOption === 'length') {
      results.sort((a, b) => parseInt(a.length) - parseInt(b.length));
    }

    this.filteredTrips = results;
  }

  public isLoggedIn() {
    return this.authentication.isLoggedIn();
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
