import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos si el usuario está autenticado (si existe un token guardado)
  if (authService.isLoggedIn()) {
    return true; 
  }

  // Si no está autenticado, lo redirigimos al login
  router.navigate(['/login']);
  return false; 
};
