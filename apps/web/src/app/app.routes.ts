import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'birthdays',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'birthdays',
    loadChildren: () => import('./features/birthdays/birthdays.routes').then(m => m.BIRTHDAYS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'birthdays'
  }
];
