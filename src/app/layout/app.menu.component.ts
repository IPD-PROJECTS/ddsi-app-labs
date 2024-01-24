import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { AppMenuitemComponent } from './app.menuitem.component';
import { MenuItem } from 'primeng/api';
import { ENV_KEY } from '@ddsi-labs-apps/enums';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuModule, AppMenuitemComponent],
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'Espace Plaques',
        icon: 'fa-solid fa-flask-vial',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-home',
            routerLink: ['/apps/plates'],
          },
          {
            label: 'Gestion des Patients',
            icon: 'fa-solid fa-user',
            routerLink: ['/apps/plates/patients/list'],

          },
          {
            label: 'Gestion des Plaques',
            icon: 'fa-solid fa-magnifying-glass-chart',
            routerLink:[ '/apps/plates/plate-plan/list'],
          },
          {
            label: 'Gestion des types de plaques',
            icon: 'fa-solid fa-magnifying-glass-chart',
            routerLink:[ '/apps/plates/list-plate-type'],
          },
          {
            label: 'Gestion des Utilisateurs',
            icon: 'fa-solid fa-user-nurse',
            replaceUrl: false,
            target: '_blank',
            url:`${process.env[ENV_KEY.BASE_URL]}/adm`
          }
        ],
      },
      {
        label: 'Espace Animalerie',
        icon: 'fa-solid fa-paw',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/apps/pets'],
          },
          {
            label: 'Gestion des animaux',
            icon: 'fa-solid fa-list-check',
            routerLink: ['/apps/pets/list'],

          },
          {
            label: 'Gestion des Utilisateurs',
            icon: 'fa-solid fa-user-nurse',
            routerLink:[ '/apps/plates/users/list']
          }
        ],
      },

    ];
  }
}
