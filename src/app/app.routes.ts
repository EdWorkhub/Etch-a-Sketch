import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    {  
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '',
        component: MainComponent
    }
];
