import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'main',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/main/main.module').then((module) => module.MainModule),
  },
];
