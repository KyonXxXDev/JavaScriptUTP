import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { Menu } from './model/Menu';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, RouterLink, RouterLinkActive, MatMenuModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  menu: Menu[];
  protected readonly title = signal('idei-document');
  private readonly isOpen = signal(true);
  constructor(private readonly router: Router){
    this.menu = this.populateMenu();
  }
  populateMenu(){
    let menu: Menu[]=[
      new Menu('Home', '/', 'home'),
      new Menu('Dashboard', '/dashboard', 'dashboard'),
      new Menu('Tiendas', '/tienda', 'store'),
      new Menu('Certificados', '/certificado', 'chrome_reader_mode'),
      new Menu('Asociaciones', '/asociacion', 'group_work'),
      new Menu('Generador de Certificados', 'generator', 'chrome_reader_mode'),
    ];
    return menu;
  }

  redirectTo(path: string){
    this.router.navigate([path]);
  }

  toogleSidebar = () => {
    this.isOpen.update(value => !value);
  }
}
