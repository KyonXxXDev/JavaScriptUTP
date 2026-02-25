import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { Menu } from './models/Menu';
import {MatIconModule} from '@angular/material/icon';
import { ThemeService } from './services/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, RouterLink, RouterLinkActive, MatMenuModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  menu: Menu[];
  protected readonly title = signal('idei-document');
  private readonly isOpen = signal(true);
  readonly themeService = inject(ThemeService);
  
  constructor(private readonly router: Router){
    this.menu = this.populateMenu();
  }
  populateMenu(){
    let menu: Menu[]=[
      new Menu('Home', '/', 'home'),
      new Menu('Dashboard', '/dashboard', 'dashboard'),
      new Menu('Tiendas', '/tienda', 'store'),
      new Menu('Certificados', '/certificado', 'chrome_reader_mode'),
      new Menu('Asociaciones', '/asociacion', 'group_work')
    ];
    return menu;
  }

  redirectTo(path: string){
    this.router.navigate([path]);
  }

  toogleSidebar = () => {
    this.isOpen.update(value => !value);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
