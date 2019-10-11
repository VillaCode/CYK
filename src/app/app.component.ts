import { Component, ɵConsole } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  //iniciales
  resp:boolean;
  palabra:string;
  cykTabla:any[][];
  generadoresArray:any[];
  bTrack:any[];

  constructor(){
    this.generadoresArray = new Array();
    this.cykTabla = [];
    this.bTrack = [];
    this.resp = true;
    this.palabra = '';

  };



  ///////////////////////////Algoritmo cyk main///////////////////////////////

  cyk(palabra:string){
    console.log(this.generadoresArray); //debug
    console.log(this.palabra); //debug


    this.inicializaTabla(palabra);
    this.guardaPalabra(palabra);

  }



  ///////////////////////////////Utilidades///////////////////////////////////
  
  inicializaTabla(palabra:string){

  }



  verificaGenerado(){

  }



  guardaGen(generador:string){
      this.generadoresArray.push([generador.split('>')[0], generador.split('>')[1]]);      
  }



  guardaPalabra(palabra:string){

    this.palabra = palabra;
    
  }


  
  guardaBTrack(){

  }
}
