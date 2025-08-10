import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  // || CONSTRUCTOR
  constructor() { }

  // || PROPERTIES
  
  // Tracks default / custom grid value 
  isDefaultGrid = true;
  // Tracking input val 
  customGridSize!: number;
  // Default custom size val, init to 0 
  gridItemWidth: number = 0;
  gridItemHeight: number = 0;

  // Tracking Selection Component open / close 
  dialogOpen = false;
  gridUpdated = false;

  // || GENERAL FUNCTIONS

  // Generate default grid of 16x16 or take in custom input from 1-100
  // Take in gridMath() size value, set generated box div to that value 
  // Multiply by val 
  // Generate that numOfSquares at that gridSize within GridComponent 
  // calculateGridItemWidth(val: number): number {
  //   // Find square dimensions based on input val 
  //   // NEW: Need two dimensions for L X W 
  //     this.gridItemWidth = this.getWidth(val);
  //     this.calculateGridItemHeight(val);
  //     return this.gridItemWidth;
  // }

  // calculateGridItemHeight(val: number): number {
  // // Find square dimensions based on input val 
  // // NEW: Need two dimensions for L X W 
  //   this.gridItemHeight = this.getHeight(val);
  //   // Track input val 
  //   this.customGridSize = val;
  //   // Pass customGridValue to GridComponent
  //   this.changeGrid();
  //   return this.gridItemHeight;
  // }

  intakeCustomGridValue(val: number): void{
    this.customGridSize = val;
    this.changeGrid();
  }

  getWidth(val: number): number {
    // NEW: Page now 80vh, 100vw; need to calculate each side 
    return  (100 / val);
  }

  getHeight(val: number): number {
    return (80 / val);
  }

  // grid$ Behavior Subject -> Informs Grid Component when customGridSize value has been input via SelectionComponent into Service 
  // BS = return Func, new BS<>(), observable$, next(return)
  returnGrid() {
    return this.customGridSize;
  }
  //
  private gridSource = new BehaviorSubject<number | null>(null);
  grid$ = this.gridSource.asObservable();
  changeGrid() {
    this.gridSource.next(this.returnGrid());
  }

  // $dialog Behavior Subject -> Tracks whether SelectionComponent is open overtop of MainComponent (dialogOpen === open SelectionComponent)
  // BS = return Func, new BS<>(), observable$, next(return)
  returnDialog() {
    return this.dialogOpen;
  };
  // Establish BS set to Return Service Val 
  private dialogSource = new BehaviorSubject<boolean>(this.returnDialog());
  // Create observable obj 
  dialog$ = this.dialogSource.asObservable();
  // Function to go "next" and fire val change
  openSelectionDialog() {
    this.dialogSource.next(this.returnDialog())
  }

  // || NAVIGATION FUNCTIONS 

  // Opens Dialog (SelectionComponent)
  openDialog() {
    this.dialogOpen = true; 
    this.openSelectionDialog();
  }

  // Closes Dialog 
  closeDialog() {
    this.dialogOpen = false; 
    this.openSelectionDialog();
  }

}
