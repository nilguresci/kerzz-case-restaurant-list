import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { RestaurantServiceService } from 'src/app/services/restaurant-service.service';
import { Restaurant, RestaurantResultType } from 'src/app/types/restaurantType';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private restaurantService: RestaurantServiceService) {}

  ngOnInit() {
    this.checkLocationPeriodically(this.onGetRestaurantList.bind(this));
  }

  async checkLocationPeriodically(callback: () => void) {
    let localStorageLatitude = localStorage.getItem('latitude');
    let localStorageLongitude = localStorage.getItem('longitude');
    while (true) {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            if (
              JSON.parse(localStorageLatitude!) !== latitude ||
              JSON.parse(localStorageLongitude!) !== longitude
            ) {
              localStorage.setItem('latitude', JSON.stringify(latitude));
              localStorage.setItem('longitude', JSON.stringify(longitude));
            } else {
              console.log(
                `Latitude: ${JSON.parse(
                  localStorageLatitude!
                )}, Longitude: ${JSON.parse(localStorageLongitude!)}`
              );
            }
            callback();
          });
        } else {
          console.log('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        console.log('Error getting location');
      }

      // Wait for 30 minutes (1800000 milliseconds) before checking again
      await this.delay(1800000);
    }
  }

  onGetRestaurantList(): void {
    this.restaurants = [];
    const skip = (this.currentPage - 1) * this.itemsPerPage;

    this.restaurantService
      .getRestaurantList(this.itemsPerPage, skip)
      .subscribe((res) => {
        this.restaurants = res.response;
        this.currentPage++;
      });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.onGetRestaurantList();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
