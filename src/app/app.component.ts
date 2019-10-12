import { Component, ɵConsole } from '@angular/core';
import { LOADIPHLPAPI } from 'dns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //iniciales
  resp: boolean;
  palabra: string;
  cykTabla: any[][];
  generadoresArray: any[];
  bTrack: any[];
  primera: boolean;

  constructor() {
    this.generadoresArray = new Array();
    this.bTrack = [];
    this.palabra = '';
  };



  ///////////////////////////Algoritmo cyk main///////////////////////////////

  cyk(palabra: string) {

    this.palabra = palabra;
    console.log(this.generadoresArray); //debug
    console.log(this.palabra); //debug

    this.inicializaTabla(palabra);








    this.primera = true;
  }



  ///////////////////////////////Utilidades///////////////////////////////////

  inicializaTabla(palabra: string) {
    let maxI = palabra.length - 1;
    this.cykTabla = this.inicializaArray(maxI + 1);
    console.log(maxI);
    let j = maxI;
    for (let i = 0; i <= maxI; i++) {
      this.cykTabla[i][j] = palabra[i];
      j--;
    }
    console.log(this.cykTabla);
  }



  inicializaArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr[i] = [];
    }
    return arr;
  }



  verificaGenerado() {

  }



  guardaGen(generador: string) {
    this.generadoresArray.push([generador.split('>')[0], generador.split('>')[1]]);
  }




  guardaBTrack() {

  }
}
