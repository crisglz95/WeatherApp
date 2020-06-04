import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinToCelsius'
})
export class KelvinToCelsiusPipe implements PipeTransform {

  transform(temperatura: number): string {
    let celsius:number = Math.floor(temperatura - 273.15);
    return `${celsius}°`;
  }

}
