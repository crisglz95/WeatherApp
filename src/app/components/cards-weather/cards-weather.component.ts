import { Component, OnInit, Input } from '@angular/core';
import { ClimaFiltrado } from '../../interfaces/clima.interface'

@Component({
  selector: 'app-cards-weather',
  templateUrl: './cards-weather.component.html',
  styleUrls: ['./cards-weather.component.css']
})
export class CardsWeatherComponent implements OnInit {

  @Input() climaFiltradoRecibido: ClimaFiltrado;

  constructor() { }

  ngOnInit(): void {
    console.log(this.climaFiltradoRecibido);
  }

  public AgregarCiudad(){
    const arrayWeather = this.GetLocalStorage();
    arrayWeather.push(this.climaFiltradoRecibido.NombreCiudad);
    console.log(arrayWeather);
    localStorage.setItem('climas', JSON.stringify(arrayWeather));
  }

  public GetLocalStorage(){
    const arrayWeather = JSON.parse(localStorage.getItem('climas'));
    if(arrayWeather == null){
      return [];
    }else{
      return arrayWeather;
    }
  }

}
