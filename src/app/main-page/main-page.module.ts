import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainPageRoutingModule } from './main-page-routing.module';

import { MainPage } from './main-page.page';
import { HeaderComponent } from '../components/header/header.component';
import { RestaurantListComponent } from '../components/restaurant-list/restaurant-list.component';
import { RestaurantCardComponent } from '../components/restaurant-card/restaurant-card.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, MainPageRoutingModule],
  declarations: [
    MainPage,
    HeaderComponent,
    RestaurantListComponent,
    RestaurantCardComponent,
  ],
})
export class MainPageModule {}
