import { Component, OnInit, Input } from '@angular/core';
import { ClimaFiltrado } from '../../interfaces/clima.interface'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards-weather',
  templateUrl: './cards-weather.component.html',
  styleUrls: ['./cards-weather.component.css']
})
export class CardsWeatherComponent implements OnInit {

  @Input() climaFiltradoRecibido: ClimaFiltrado;
  @Input() mostrarBoton: boolean = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log(this.mostrarBoton);
  }

  public AgregarCiudad(){
    const arrayWeather = this.GetLocalStorage();
    console.log(arrayWeather);
    if (this.ChecarNoRepetidos(arrayWeather) === 0){
      arrayWeather.push(this.climaFiltradoRecibido.NombreCiudad);
      console.log(arrayWeather);
      localStorage.setItem('climas', JSON.stringify(arrayWeather));
    }else{
      Swal.fire({
        title: 'Ciudad Repetida',
        icon: 'warning',
        text: 'La ciudad elegida ya fue anteriormente seleccionada'
      })
    }
  }
  private ChecarNoRepetidos(arrayWeather: Array<string>):number{
    const ciudades: Array<string> = arrayWeather.filter(clima => clima === this.climaFiltradoRecibido.NombreCiudad);
    return ciudades.length;
  }

  public GetLocalStorage(){
    const arrayWeather = JSON.parse(localStorage.getItem('climas'));
    if(arrayWeather == null){
      return [];
    }else{
      return arrayWeather;
    }
  }

  public IrDetalles(ciudad){
    if(!this.mostrarBoton){
      this.router.navigate(['details', ciudad]);
    }
  }

}
