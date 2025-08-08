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
  defaultGridSize: number = 256;
  // Custom Grid size tracker 
  customGridSize: number = 0;
  // Store Grid dimensions, init to 0 but set to 16 square val by default, then track value from custom inputs provided by service
  squareDimensions!: number;
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
    this.gridService.dialog$.subscribe(dialog =>{
      if (dialog) {
        this.destroyAnimation()
      }
    });
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
    // Set Grid Size to 16 x 16 
    this.customGridSize = this.defaultGridSize;
    // Set CSS Dimensions based on rootof defaultGridSize
    this.squareDimensions = (50/16)
    // Log Object 
    console.log(this.gridSizeObj);
    // Curr: Array of 16, squareSize = 16 / 500, numOfSquares = 16
    this.gridActive = true;
  }

  // Takes in value from + 1 - 100
  generateCustomGrid(customGridSize: number) {
    this.destroyGrid();
    this.customGridSize = (customGridSize*customGridSize);
    for (let i = 0; i < this.customGridSize; i++) {
      this.gridIterator.push({});
    }
    console.log(this.gridIterator);
    this.squareDimensions = (50/customGridSize);
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

  destroyAnimation() {
    // Select all .grid template elements as Array
    const els = document.getElementsByClassName("grid") as HTMLCollectionOf<HTMLElement>
    // Loop over Array and remove .active animation css class 
    // Called when SelectionComponent is opened to avoid bug where animation shows over z index (possible other solution...)
    for (let i = 0; i < els.length; i++) {
      if (els[i].classList.contains('active')) {
        els[i].classList.remove('active');
      }
    }
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
