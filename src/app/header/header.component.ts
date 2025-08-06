import { Component } from '@angular/core';
import { GridService } from '../grid.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // Constructor 
  constructor(private gridService: GridService) {}

  openDialog() {
    this.gridService.openDialog();
  }
}
