import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  {
    path: 'ranking',
    canActivate: [authGuard], 
    loadComponent: () => import('./features/pokemon-ranking/pokemon-ranking.component')
        .then(m => m.PokemonRankingComponent)
  }
];