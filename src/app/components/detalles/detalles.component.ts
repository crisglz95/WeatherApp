import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { pluck, switchMap, map } from 'rxjs/operators';
import { Clima } from 'src/app/interfaces/clima.interface';
import { ClimaDetalle, ClimaFiltrado } from '../../interfaces/clima.interface';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apiKey = `&appid=03660e9db7dd1d5898fda207bb6c5775`;
  public loading: boolean;
  public DetalleClima:any = [];

  //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { 
    this.loading = true;
    this.activatedRoute
    .params
    .pipe(
      pluck('nombreCiudad'),
      switchMap(nombreCiudad => this.http.get(`${this.url}${nombreCiudad}${this.apiKey}`).pipe(
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
