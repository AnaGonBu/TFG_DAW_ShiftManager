import { EventEmitter, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Empleado } from '../interfaces/empleado';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:8085/empleados';
  public authChanged = new EventEmitter<void>();

  login(email: string, password: string) {
    return this.http.get<Empleado[]>(this.apiUrl).pipe(
      tap(empleados => {
        const usuario = empleados.find(emp =>
          emp.email === email && emp.password === password
        );

        if (usuario) {
          localStorage.setItem('currentUser', JSON.stringify(usuario));
          this.authChanged.emit(); // Avisa al navbar que hubo cambios
          console.log('Usuario logueado:', usuario);

          // Redirigir según rol
          switch (usuario.rol) {
            case 'admin': this.router.navigate(['/calendario']); break;
            case 'user': this.router.navigate(['/calendario']); break;
          }
        } else {
          alert('Credenciales inválidas o usuario desactivado');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.authChanged.emit();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): Empleado | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.rol : null;
  }
}
