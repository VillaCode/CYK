import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(){
    this.hola();
  }

  resp:boolean = true;
  
  title = 'CYK Algorithm';


  hola(){
    console.log("Hola!")
  }

  




}
