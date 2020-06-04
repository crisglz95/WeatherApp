import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'construirUrlImagen'
})
export class ConstruirUrlImagenPipe implements PipeTransform {

  private urlImage = 'http://openweathermap.org/img/wn/';
  private urlImageComplementaria = '@2x.png';

  transform(tipoImagen: string): string {
    return `${this.urlImage}${tipoImagen}${this.urlImageComplementaria}`;
  }

}
