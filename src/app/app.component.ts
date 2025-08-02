import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'etch-a-sketch';
  gridQuantity: number = 256;

  generateRowIndexes(val: number): Array<number> {
    // Allows for easier use of ngFor loops with number val
    // Array(val) creates array of undefined x val
    // Array(val).keys() converts array into iterator of indices...[0, 1, 2]
    // Array.from(Array(val).keys()) creates real accessible Array from iterable Array
    return Array.from(Array(val).keys());
  }
  

  // Helper Functions 

  // Getter / Setter Functions 

}
