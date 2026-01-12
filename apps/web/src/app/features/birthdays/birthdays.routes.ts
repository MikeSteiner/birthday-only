import { Routes } from '@angular/router';
import { BirthdaysListComponent } from './pages/birthdays-list/birthdays-list.component';

export const BIRTHDAYS_ROUTES: Routes = [
  {
    path: '',
    component: BirthdaysListComponent
  }
];
