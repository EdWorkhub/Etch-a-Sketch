import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { GridService } from '../../grid.service';

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
  // Default 16x16 grid size
  // 1x1 = 1
  // 16x16 = 256
  // 32x32 = 1024 
  // 64x64 = 4096
  // 100x100 = 10000
  defaultGridSizeRoot: number = 16;
  defaultGridSize: number = 256;
  // Custom Grid size tracker 
  customGridSizeRoot: number = 0;
  customGridSize: number = 0;
  // Store Grid dimensions then track value from custom inputs provided by service
  gridItemWidth!: number;
  gridItemHeight!: number;
  // Empty array used as iterator for *ngFor in template 
  gridIterator: object[] = [];

  // || ngOnInit 
  ngOnInit() {
    // Generate default 16x16 grid 
    this.generateDefaultGrid();
    // Subscribe to dialog$ event in Service to track when SelctionComponent is opened 
    // When is opened, removes animation css classes to avoid overlap
    this.gridService.dialog$.subscribe(dialog =>{
      if (dialog) {
        this.destroyAnimation()
      }
    });
    // Subscribe to grid$ event in Service to see when customGridSize is input from SelectionComponent 
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
    // Generate Array of 16x16 for use in iterator
    for (let i = 0; i < this.defaultGridSize; i++) {
      this.gridIterator.push({});
    }
    // Set Grid Size to 16 x 16 
    this.customGridSize = this.defaultGridSize;
    // Set CSS Dimensions based on defaultGridSizeRoot
    this.gridItemWidth = this.gridService.getWidth(this.defaultGridSizeRoot)
    this.gridItemHeight = this.gridService.getHeight(this.defaultGridSizeRoot)
    // Show Grid 
    this.gridActive = true;

  }

  // Takes in value from + 1 - 100
  generateCustomGrid(customGridInput: number) {
    this.destroyGrid();
    this.customGridSizeRoot = customGridInput;
    this.customGridSize = (this.customGridSizeRoot*this.customGridSizeRoot);
    for (let i = 0; i < this.customGridSize; i++) {
      this.gridIterator.push({});
    }
    console.log(this.gridIterator);
    this.gridItemWidth = this.gridService.getWidth(this.customGridSizeRoot);
    this.gridItemHeight = this.gridService.getHeight(this.customGridSizeRoot)
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

    const onAnimationEnd = () => {
      el.classList.remove('active');                // Remove 'active' class immediately
      el.removeEventListener('animationend', onAnimationEnd);  // Clean up listener
    };

    // 4. Listen for the animation to finish
    el.addEventListener('animationend', onAnimationEnd);
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
}
