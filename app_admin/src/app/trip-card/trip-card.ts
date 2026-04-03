import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard implements OnInit {
  @Input() trip: any;

  constructor(
    private router: Router,
    private authentication: Authentication,
    private tripData: TripData,
  ) {}

  ngOnInit(): void {
    console.log('Trip loaded:', this.trip);
  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(trip: Trip): void {
    const confirmation = confirm('Are you sure you want to delete this trip?');

    if (confirmation) {
      this.tripData.deleteTrip(trip.code).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error: any) => {
          console.log('Error deleting trip: ' + error);
        },
      });
    }
  }

  public isLoggedIn() {
    return this.authentication.isLoggedIn();
  }
}
