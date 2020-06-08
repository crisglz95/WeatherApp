import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {

  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apiKey = `&appid=03660e9db7dd1d5898fda207bb6c5775`;

  constructor(private http: HttpClient) { }

  public ObtenerClima(NombreCiudad: string){
    return this.http.get(`${this.url}${NombreCiudad}${this.apiKey}`);
  }
}
