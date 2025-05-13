import { Component, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy {

  rol: string | null = null;
  private authSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.updateRole(); // Carga inicial
    
    // Listener que reacciona a cambios de autenticación
    this.authSubscription = this.authService.authChanged.subscribe(() => {
      this.updateRole();
    });
  }

  private updateRole(): void {
    this.rol = this.authService.getUserRole();
  }

  logout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe(); // Importante para evitar memory leaks
  }
}
