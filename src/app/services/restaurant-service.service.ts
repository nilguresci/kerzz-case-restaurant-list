import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestaurantResultType } from '../types/restaurantType';

interface Body {
  skip: number;
  limit: number;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantServiceService {
  constructor(private http: HttpClient) {}

  getRestaurantList(
    limit: number,
    skip: number
  ): Observable<RestaurantResultType> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        apiKey: 'bW9jay04ODc3NTU2NjExMjEyNGZmZmZmZmJ2',
      }),
    };
    let latitude: number = JSON.parse(localStorage.getItem('latitude')!);
    let longitude: number = JSON.parse(localStorage.getItem('longitude')!);

    let body: Body = {
      skip,
      limit,
      latitude: latitude,
      longitude: longitude,
    };

    return this.http
      .post<any>(
        'https://smarty.kerzz.com:4004/api/mock/getFeed',
        body,
        httpOptions
      )
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError('Error');
        })
      );
  }
}
