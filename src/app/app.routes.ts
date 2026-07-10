import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    loadComponent: () => import('./features/pokemon-ranking/pokemon-ranking.component')
        .then(m => m.PokemonRankingComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
