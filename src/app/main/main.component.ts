import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { SelectionComponent } from './selection/selection.component';
import { GridService } from '../grid.service';

@Component({
  selector: 'app-main',
  imports: [SelectionComponent, GridComponent, NgIf ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  // || CONSTRUCTOR
  constructor(private gridService: GridService) {}

  // || PROPERTIES 

  // Indicates whether SelectionComponent dialog is opened - Property that matches Service 
  dialogOpen = false;

  // || ngOnInit 
  // Subscribe to dialogOpen changes from Service in order to know when to display SelectionComponent - this.dialogOpen subscribes to service.dialogOpen
  ngOnInit() {
    this.gridService.dialog$.subscribe(dialog => this.dialogOpen = dialog)
  }

  // || DEPRECATED FUNCTIONS 

  // Was using this with NgFor prior to realizing that column sizes needed to be generated dynamically via backend 
  // generateRowIndexes(val: number): Array<number> {
  //   // Allows for easier use of ngFor loops with number val
  //   // Array(val) creates array of undefined x val
  //   // Array(val).keys() converts array into iterator of indices...[0, 1, 2]
  //   // Array.from(Array(val).keys()) creates real accessible Array from iterable Array
  //   return Array.from(Array(val).keys());
  // }

}
