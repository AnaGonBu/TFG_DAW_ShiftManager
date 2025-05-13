
import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'];
  const userRole = authService.getUserRole();

  if (userRole === expectedRole) {
    return true;
  }
  
  // Redirigir al dashboard según su rol si intenta acceder a ruta no permitida
  switch(userRole) {
    case 'admin': router.navigate(['/calendario']); break;
    case 'user': router.navigate(['/calendario']); break;
    default: router.navigate(['/login']);
  }
  
  return false;
};