import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'ranking',
    loadComponent: () => import('./features/pokemon-ranking/pokemon-ranking.component')
        .then(m => m.PokemonRankingComponent)
}
];