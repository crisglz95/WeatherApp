import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { fromEvent } from 'rxjs';
import { pluck, debounceTime, switchMap, map, tap } from 'rxjs/operators';
import { Clima, ClimaFiltrado } from '../../interfaces/clima.interface';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiWeatherService } from '../../services/api-weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('inputCiudad') inputCiudad: ElementRef;
  public climaFiltrado: ClimaFiltrado;
  public mostrarTarjeta: boolean = false;

  constructor(private router: Router, private apiWeather: ApiWeatherService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ObtenerClimaActual();
  }

  private ObtenerClimaActual(){
    fromEvent(this.inputCiudad.nativeElement, 'keyup')
      .pipe(
        tap(() => (this.mostrarTarjeta = false)),
        pluck('target', 'value'),
        debounceTime(1500),
        switchMap((nombreCiudad:string) => this.apiWeather.ObtenerClima(nombreCiudad).pipe(
          map((clima: Clima) => {
            return{
              NombreCiudad: clima.name,
              ClimaActual: clima.weather[0].main,
              TemperaturaActual: clima.main.temp,
              TemperaturaMax: clima.main.temp_max,
              TemperarutaMin: clima.main.temp_min,
              Imagen: clima.weather[0].icon
            }
          })
        ))
      )
      .subscribe(
        (objetoFiltrado: ClimaFiltrado) => (
          this.climaFiltrado = objetoFiltrado,
          this.mostrarTarjeta = true
        ),
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'El nombre de la ciudad no existe'
          });
          this.ObtenerClimaActual();
        }
      );
  }

  public IrHome(){
    this.router.navigate(['']);
  }

}
