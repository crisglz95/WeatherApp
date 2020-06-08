import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { pluck, switchMap, map } from 'rxjs/operators';
import { Clima } from 'src/app/interfaces/clima.interface';
import { ClimaDetalle, ClimaFiltrado } from '../../interfaces/clima.interface';
import { ApiWeatherService } from '../../services/api-weather.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  public loading: boolean;
  public DetalleClima:any = [];

  //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}

  constructor(private activatedRoute: ActivatedRoute, private AWService: ApiWeatherService) { 
    this.loading = true;
    this.activatedRoute
    .params
    .pipe(
      pluck('nombreCiudad'),
      switchMap((nombreCiudad: string) => this.AWService.ObtenerClima(nombreCiudad).pipe(
        map((clima: Clima) => {
          const climaFiltrado: ClimaDetalle = {
            NombreCiudad: clima.name,
            ClimaActual: clima.weather[0].main,
            TemperaturaActual: clima.main.temp,
            Humedad: clima.main.humidity,
            Aire: clima.wind.speed
          };
          return climaFiltrado;
        })
      ))
    ).subscribe((ClimaFiltrado: ClimaDetalle) => {
      this.loading = false;
      console.log(ClimaFiltrado);
      this.DetalleClima = ClimaFiltrado;
    })
  }

  ngOnInit(): void {
  }

}
