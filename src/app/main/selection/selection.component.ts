import { Component } from '@angular/core';
import { GridService } from '../../grid.service';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-selection',
  imports: [ReactiveFormsModule],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss'
})
export class SelectionComponent {

  // || CONSTRUCTOR 
  constructor(private gridService: GridService) {}

  // || PROPERTIES 
  userVal!: number

  // || REACTIVE FORMS 
  myForm = new FormGroup({
    myInput: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(100)
    ])
  });

  submitForm() {
    if (this.myForm.valid) {
      this.userVal! = Number(this.myForm.value.myInput);
    }
    this.gridService.intakeCustomGridValue(this.userVal!);
    this.gridService.closeDialog();
  }

  // || GENERAL FUNCTIONS 
  onCloseSelection() {
    this.gridService.closeDialog();
  }

}
