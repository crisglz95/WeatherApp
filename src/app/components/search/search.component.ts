import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { fromEvent } from 'rxjs';
import { pluck, debounceTime, switchMap, map, tap } from 'rxjs/operators';
import { Clima, ClimaFiltrado } from '../../interfaces/clima.interface';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('inputCiudad') inputCiudad: ElementRef;
  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apiKey = `&appid=03660e9db7dd1d5898fda207bb6c5775`;
  public climaFiltrado: ClimaFiltrado;
  public mostrarTarjeta: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

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
        switchMap(nombreCiudad => this.http.get(`${this.url}${nombreCiudad}${this.apiKey}`).pipe(
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
