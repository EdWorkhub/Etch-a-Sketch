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
  squareSize: number = 0;

  // Tracking Selection Component open / close 
  dialogOpen = false;
  gridUpdated = false;

  // || GENERAL FUNCTIONS

  // Generate default grid of 16x16 or take in custom input from 1-100
  // Take in gridMath() size value, set generated box div to that value 
  // Multiply by val 
  // Generate that numOfSquares at that gridSize within GridComponent 
  calculateGrid(val: number) {
    // Find square dimensions based on input val 
      this.squareSize = this.gridMath(val);
      // Track input val 
      this.customGridSize = val;
      this.changeGrid();
      return this.squareSize;
  }

  gridMath(val: number) {
    // Find column row size data based on input val 
    // Based on 50vh x 50vw
    // squareSize = 50 / val (i.e 16 = 3.125)
    // gridSize = numOfSquares x numOfSquares
    // Will eventually be based on some dynamic screen value, currently pegged as static 

    // NEW: Page now 80vh, 100vw; need to calculate each side 
    return  (100 / val);
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
