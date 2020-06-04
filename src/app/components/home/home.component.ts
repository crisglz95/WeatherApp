import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Clima, ClimaFiltrado } from '../../interfaces/clima.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apiKey = `&appid=03660e9db7dd1d5898fda207bb6c5775`;
  public arrayClimaFiltrado: Array<ClimaFiltrado> = [];
  public loading: boolean = true;

  constructor(private router: Router, private http: HttpClient) { 
    this.getLocalStorage();
  }

  ngOnInit(): void {
  }

  public IrAgregar(){
    this.router.navigate(['add']);
  }

  public getLocalStorage(){
    const clima = JSON.parse(localStorage.getItem('climas'));
    if(clima !== null){
      this.getWeather(clima);
    }
  }

  public getWeather(climas: Array<string>){
    from(climas).pipe(
      concatMap(nombreClima => this.http.get(`${this.url}${nombreClima}${this.apiKey}`)
      .pipe(
        map((Clima: Clima) => {
          const climaFiltrado: ClimaFiltrado = {
            NombreCiudad: Clima.name, 
            ClimaActual: Clima.weather[0].main, 
            TemperaturaActual: Clima.main.temp,
            TemperaturaMax: Clima.main.temp_max,
            TemperarutaMin: Clima.main.temp_min,
            Imagen: Clima.weather[0].icon
          };
          return climaFiltrado;
      })
      )
      )
    ).subscribe((ClimaFiltrado: ClimaFiltrado) => {
      this.arrayClimaFiltrado.push(ClimaFiltrado);
      if(this.arrayClimaFiltrado.length==climas.length){
        this.loading = false;
      }
    })
  }

}
