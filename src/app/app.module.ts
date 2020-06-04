import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { CardsWeatherComponent } from './components/cards-weather/cards-weather.component';

import { HttpClientModule } from '@angular/common/http';
import { KelvinToCelsiusPipe } from './components/pipe/kelvin-to-celsius.pipe';
import { CambiarImagenClimaDirective } from './components/directives/cambiar-imagen-clima.directive';
import { ConstruirUrlImagenPipe } from './components/pipe/construir-url-imagen.pipe';
import { HomeComponent } from './components/home/home.component';
import { appRouting } from './app.routes';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CardsWeatherComponent,
    KelvinToCelsiusPipe,
    CambiarImagenClimaDirective,
    ConstruirUrlImagenPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    appRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
