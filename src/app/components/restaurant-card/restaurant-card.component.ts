import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/types/restaurantType';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
})
export class RestaurantCardComponent implements OnInit {
  @Input() restaurantInfo!: Restaurant;
  distance: string = '';
  currentLatitude: number = JSON.parse(localStorage.getItem('latitude')!);
  currentLongitude: number = JSON.parse(localStorage.getItem('longitude')!);

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // Cihazın konumuna olan uzaklığı hesapla
    this.calculateDistanceToTarget(
      this.restaurantInfo.storeInfo.geoLocation.latitude,
      this.restaurantInfo.storeInfo.geoLocation.longitude
    );
  }

  haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R: number = 6371; // Dünya yarıçapı in kilometers
    const dLat: number = this.deg2rad(lat2 - lat1);
    const dLon: number = this.deg2rad(lon2 - lon1);
    const a: number =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance: number = R * c; // Mesafe kilometers cinsinden

    return distance;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  async calculateDistanceToTarget(targetLat: number, targetLon: number) {
    try {
      const distance: number = this.haversine(
        this.currentLatitude,
        this.currentLongitude,
        targetLat,
        targetLon
      );
      this.distance = distance.toFixed(2);
    } catch (error: any) {
      console.error('Konum alınamadı:', error.message);
    }
  }
}
