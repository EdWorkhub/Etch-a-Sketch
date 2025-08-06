import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { GridService } from '../../grid.service';

// Testing use of object to transfer data from service to GridComponent
type sizeObj = {
  objSquareSize: number;
  objNumOfSquares: number;
}

@Component({
  selector: 'app-grid',
  imports: [NgFor, NgIf],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  // || CONSTRUCTOR
  constructor(private gridService: GridService) {}

  // || PROPERTIES

  // Defines Grid visibility
  gridActive = false;
  // Tracks when Grid needs to be updated 
  gridUpdated = false;
  // Default 16x16 grid size, edited via service (used for static display only)
  // 1x1 = 1
  // 16x16 = 256
  // 32x32 = 1024 
  // 64x64 = 4096
  // 100x100 = 10000
  defaultGridSize: number = 1024;
  // Custom Grid size tracker 
  customGridSize: number = 0;
  // Store Grid dimensions, init to 0 but set to 16 square val by default, then track value from custom inputs provided by service
  squareSize: number = 0;
  // Object for storing size / quantity values instead? 
  gridSizeObj: sizeObj = {
    objSquareSize: 0,
    objNumOfSquares: 0
  }
  // Empty array to be used as iterator 
  gridIterator: object[] = [];

  // || ngOnInit 
  ngOnInit() {
    this.generateDefaultGrid();
    this.gridService.grid$.subscribe(grid => {
      if (grid) {
        this.generateCustomGrid(grid);
      }
    })
  }

  // || GENERAL FUNCTIONS
  generateDefaultGrid() {
    // Destroy existing grid 
    this.destroyGrid();
    // Generate Array of 16 for use in iterator
    for (let i = 0; i < this.defaultGridSize; i++) {
      this.gridIterator.push({});
    }
    // Log Array
    console.log(this.gridIterator);
    this.customGridSize = this.defaultGridSize;
    this.squareSize = this.gridSizeObj.objSquareSize;
    // Log Object 
    console.log(this.gridSizeObj);
    // Curr: Array of 16, squareSize = 16 / 500, numOfSquares = 16
    this.gridActive = true;
  }

  // Takes in value from + 1 - 100
  generateCustomGrid(customGridSize: number) {
    this.destroyGrid();
    for (let i = 0; i < customGridSize; i++) {
      this.gridIterator.push({});
    }
    console.log(this.gridIterator);
    this.customGridSize = customGridSize;
    this.squareSize = this.gridSizeObj.objSquareSize;
    console.log(this.gridSizeObj);
    this.gridActive = true;
  }

  // Simple Grid Div Animation 
  animateGrid(event: MouseEvent) {
    // Grab HTMLElement
    const el = event.target as HTMLElement; 

    // Check for HTML Property
    if (el.classList.contains('active')) return; 

    // If absent, add HTML property
    el.classList.add('active');

    // Exclude Div from being animated again for x ms 
    setTimeout(() => {
      el.classList.remove('active')
    }, 6000);
  }

  destroyGrid() {
    this.gridIterator = [];
  }


  // DEPRECATED 

  // Was using this with NgFor prior to realizing that column sizes needed to be generated dynamically via backend 
  generateRowIndexes(val: number): Array<number> {
  // Allows for easier use of ngFor loops with number val
  // Array(val) creates array of undefined x val
  // Array(val).keys() converts array into iterator of indices...[0, 1, 2]
  // Array.from(Array(val).keys()) creates real accessible Array from iterable Array
    return Array.from(Array(val).keys());
  }
}
