import { Component, ɵConsole } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  resp: boolean;
  palabra: string;
  cykTabla: any[][][];
  generadoresArray: any[];
  primera: boolean;
  historia: any[][];
  contadorHistoria: number = 0;
  caminoS: any[] = new Array();
  arbol: string = '';

  constructor() {
    this.generadoresArray = new Array();
    this.palabra = '';
  };



  ///////////////////////////Algoritmo cyk main///////////////////////////////
 
  cyk(palabra: string) {

    //DEBUG
    // palabra = "baaba"
    // this.generadoresArray = [
    //   ["S", "AB"],
    //   ["S", "BC"],
    //   ["A", "a"],
    //   ["A", "BA"],
    //   ["B", "b"],
    //   ["B", "CC"],
    //   ["C", "a"],
    //   ["C", "AB"],
    // ]

    
    this.palabra = palabra;
    this.inicializaTabla(palabra);
    this.inicializaArrayHistorial()
    let maxI = palabra.length - 1;
    
    console.log(this.generadoresArray);
    console.log(this.palabra); 
    console.log("-----------------EMPIEZA------------------");    

    let offSet = 1;
    
    for(let columna = 1; columna <= maxI; columna++){ //Recorre horizontal
      let filaActual = maxI;
      for (let colActual = columna; colActual <= maxI; colActual++) { //Recorre en diagonal. Aqui ya tengo mi casilla actual a evaluar
      
        let profundidadActual = 0;
        let resp = new Array();
      
        //DEBUG
        console.log("---------------ACTUAL: " + colActual + "," + filaActual + "----------------");
        

        let checkFila = filaActual-1;
          for(let checkCol = colActual-offSet; checkCol < colActual; checkCol++){ //for para iterar producciones con respecto a actual
            
            let profundidadA = 0;
            let profundidadB = 0;

            while(true){ //Profundidad de casilla
              
              //Debug
              console.log("Compara: " + this.cykTabla[checkCol][filaActual][profundidadA] + " con " + this.cykTabla[colActual][checkFila][profundidadB]); //debug

              //Concatenación de valores en casillas
              let prod1;
              let prod2;
              prod1 = this.cykTabla[checkCol][filaActual][profundidadA];
              prod2 = this.cykTabla[colActual][checkFila][profundidadB];
              let prod = prod1 + prod2;

              
              //Verificacion de productores con respecto a comparacion de valores y asignacion de respuesta en actual
              if (this.verificaGeneradoBoolean(prod)) {
                resp = this.verificaGenerado(prod);
                for(let rc = 0; rc < resp.length; rc++){
                  if(!this.existeEnCasilla(colActual, filaActual, profundidadActual, resp[rc])){
                    this.cykTabla[colActual][filaActual][profundidadActual]= resp[rc];
                    
                    this.guardaGenerador(
                      this.cykTabla[colActual][filaActual][profundidadActual], //GeneradorEncontrado
                      colActual, filaActual, profundidadActual, //coordenadas de encontrado
                      this.cykTabla[checkCol][filaActual][profundidadA], //A
                      checkCol, filaActual, profundidadA, //Coordenadas A
                      this.cykTabla[colActual][checkFila][profundidadB], //B
                      colActual, checkFila, profundidadB //Coordenadas B
                    );
                    
                    profundidadActual++;
                  }else{
                    console.log(resp[rc] + " ya estaba");
                  }
                }
              }


              //Control de loop de profundidad de casillas a comparar
              if(this.cykTabla[colActual][checkFila][profundidadB + 1]){
                profundidadB++;
              }else if(this.cykTabla[checkCol][filaActual][profundidadA + 1]){
                profundidadA++;
                profundidadB = 0;
              }else{
                break;
              }

            }


            checkFila--;
          }
        filaActual--;
      }
      offSet++;
    }
    
    ////////////////FINAL CYK//////////////

    console.log(this.cykTabla); //debug

    let respuestasCasilla = 0;
    while(this.cykTabla[maxI][maxI][respuestasCasilla]){
      if(this.cykTabla[maxI][maxI][respuestasCasilla] == 'S'){
        this.resp = true;
        this.backTrack('S'+maxI+maxI+respuestasCasilla);
        console.log(this.caminoS);
        this.generaArbol();
        break;
      }else{
        this.resp = false;
      }
      respuestasCasilla++;
    }

    

    this.primera = true;

    console.log(this.historia);
    
  }






  
  ///////////////////////////////Utilidades///////////////////////////////////

  inicializaTabla(palabra: string) {
    this.cykTabla = this.inicializaArrayCYK(palabra.length);
    let j = palabra.length - 1;
    let generadoresIniciales = this.encuentraGenIniciales(palabra);
    for (let i = 0; i <= palabra.length - 1; i++) {    
      this.cykTabla[i][j] = generadoresIniciales[i];
      j--;
    }
  }


  existeEnCasilla(colA, filA, prof, prod){
    for(let i = 0; i <= prof; i++){
      if(this.cykTabla[colA][filA][i] == prod){
        return true;
      }
    }
    return false;
  }


  encuentraGenIniciales(palabra:string){
    let productoresIniciales = [];
    for(let i = 0; i<palabra.length; i++){
      productoresIniciales[i] = this.verificaGenerado(palabra[i]);
    }
    return productoresIniciales;
  }


  inicializaArrayCYK(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr[i] = [];
      for (var x = 0; x < rows; x++) {
        arr[i][x] = [];
      };
    }
    return arr;
  }


  inicializaArrayHistorial() {
    var arr = [];
    let m = this.sizeHistorial(this.palabra.length);
    for (var i = 0; i < m; i++) {
      arr[i] = [];
    }
    this.historia = arr;
  }


  sizeHistorial(num) {
    let r = num;
    for(let i = 1; i < num; i++){
      r = r + i;
    }
    return r + num;
  }


  verificaGenerado(prod:any) {
    let productores: any[] = new Array();
    for (let i = 0; i < this.generadoresArray.length; i++) {
      if(this.generadoresArray[i][1] == prod){
        productores.push(this.generadoresArray[i][0]);
      }
    }
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




  guardaGenerador(GE, EX, EY, EZ, GA, AX, AY, AZ, GB, BX, BY, BZ) {
    

    let E:any = GE + EX + EY + EZ;
    let A:any = GA + AX + AY + AZ;
    let B:any = GB + BX + BY + BZ;

    console.log("Encontrado: " + E);
    console.log("por A: "+A+" y B: "+B);

    this.historia[this.contadorHistoria][0] = E;
    this.historia[this.contadorHistoria][1] = A;
    this.historia[this.contadorHistoria][2] = B;
    
    this.contadorHistoria++;


  }


  backTrack(cord){

    let A:string = cord;
    let flag = 0;
    
    
    
    while(flag != this.sizeHistorial(this.palabra.length) && this.historia[flag][0] != A){
      flag++;
    }
    
    
    if(flag != this.sizeHistorial(this.palabra.length)){
      this.caminoS.push(A[0]);
      this.backTrack(this.historia[flag][1]);
      this.backTrack(this.historia[flag][2]);
    }else{
      this.caminoS.push(A[0]);
      this.caminoS.push(this.origenInicialGen(A[0]));
    }
      
  }


  origenInicialGen(gen){
    for(let i = 0; i<this.generadoresArray.length; i++){
      if(this.generadoresArray[i][0] == gen && this.generadoresArray[i][1].length == 1){
        return this.generadoresArray[i][1];
      }
    }
  }


  generaArbol(){

    for(let i = 0; i<this.caminoS.length; i++){
      this.arbol += " - " + this.caminoS[i];
    }

  };


  esLower(c){
    if(c == c.toUpperCase()){
      return false;
    }else{
      return true;
    }
  }

}
