import { Component, ɵConsole } from '@angular/core';
import { LOADIPHLPAPI } from 'dns';
import { concat } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //iniciales
  resp: boolean;
  palabra: string;
  cykTabla: any[][][];
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
    this.inicializaTabla(palabra);
    let maxI = palabra.length - 1;

    
    console.log(this.generadoresArray); //debug
    console.log(this.palabra); //debug
    console.log(this.cykTabla);//debug
    console.log("--------------EMPIEZA--------------");//debug
    

    let offSet = 1;
    
    for(let columna = 1; columna <= maxI; columna++){ //Recorre horizontal
      let filaActual = maxI;
      for (let colActual = columna; colActual <= maxI; colActual++) { //Recorre en diagonal
        //HASTA AQUI TENGO CASILLA ACTUAL
        let resp = new Array();

       
        let checkFila = filaActual-1;
          for(let checkCol = colActual-offSet; checkCol < colActual; checkCol++){ //for para iterar producciones con respecto a actual
            
            let respsCasilla = 0;
            console.log("ACTUAL: " + colActual + "," + filaActual);
            console.log("checkH: " + checkCol + "," + filaActual);
            console.log("checkV: " + colActual + "," + checkFila);
            console.log("offset: " + offSet);
            
            
            
            console.log(this.cykTabla[checkCol][filaActual][0]); //debug
            console.log(this.cykTabla[colActual][checkFila][0]); //debug

            while(this.cykTabla[checkCol][filaActual][respsCasilla] || this.cykTabla[colActual][checkFila][respsCasilla]){ //Profundidad de casilla
              console.log("entrawhile");
              
              let prod1;
              let prod2;

              if (!this.cykTabla[checkCol][filaActual][respsCasilla]) {
                prod1 = "";
              }else{
                prod1 = this.cykTabla[checkCol][filaActual][respsCasilla];
              }

              if (!this.cykTabla[colActual][checkFila][respsCasilla]) {
                prod2 = "";
              }else{
                prod2 = this.cykTabla[colActual][checkFila][respsCasilla];
              }

              let prod = prod1 + prod2;

              console.log(prod);
              

              if (this.verificaGeneradoBoolean(prod)) {
                resp.push(this.verificaGenerado(prod));
              }

              respsCasilla++;
            }
            checkFila--;
            
          }

        
        console.log("salio de primer FOR--------------------------------");
        

        this.cykTabla[colActual][filaActual].push(resp);                
        filaActual--;

        
      }
      
      offSet++;
      
    }
    

    console.log(this.cykTabla); //debug

    let respuestasCasilla = 0;
    while(this.cykTabla[maxI][maxI][respuestasCasilla]){

      if(this.cykTabla[maxI][maxI][respuestasCasilla] == 'S'){
        this.resp = true;
      }else{
        this.resp = false;
      }

      respuestasCasilla++;
    }

    this.primera = true;
  }














  
  ///////////////////////////////Utilidades///////////////////////////////////

  inicializaTabla(palabra: string) {
    let maxI = palabra.length - 1;
    this.cykTabla = this.inicializaArray(maxI + 1);
    let j = maxI;
    for (let i = 0; i <= maxI; i++) {
      this.cykTabla[i][j][0] = palabra[i];
      j--;
    }
  }



  inicializaArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr[i] = [];
      
      for (var x = 0; x < rows; x++) {
        arr[i][x] = [];
      };
    }
    return arr;
  }



  verificaGenerado(prod:any) {
    let productores: any[] = new Array();
    for (let i = 0; i < this.generadoresArray.length; i++) {
      if(this.generadoresArray[i][1] == prod){
        productores.push(this.generadoresArray[i][0]);
      }
    }
    console.log(productores);
    
    return productores;
  }

  verificaGeneradoBoolean(prod:any) {
    for (let i = 0; i < this.generadoresArray.length; i++) {
      if(this.generadoresArray[i][1] == prod){
        return true;
      }
    }
    return false;
  }



  guardaGen(generador: string) {
    this.generadoresArray.push([generador.split('>')[0], generador.split('>')[1]]);
  }




  guardaBTrack() {

  }
}
