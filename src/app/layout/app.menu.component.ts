import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { AppMenuitemComponent } from './app.menuitem.component';
import { MenuItem } from 'primeng/api';

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
        label: 'Plate Workspace',
        icon: 'fa-solid fa-flask-vial',
        items: [
          {
            label: 'Summary',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/apps/plates'],
          },
          {
            label: 'Patient Management',
            icon: 'fa-solid fa-user',
            routerLink: ['/apps/plates/patients'],

          },
          {
            label: 'Plate Management',
            icon: 'fa-solid fa-magnifying-glass-chart',
            routerLink:[ '/apps/plates/plate-plan/list'],
          },
          {
            label: 'User management',
            icon: 'fa-solid fa-user-nurse',
            routerLink:[ '/apps/plates/users/list']
          }
        ],
      },
      {
        label: 'Pet Workspace',
        icon: 'fa-solid fa-paw',
        items: [
          {
            label: 'Summary',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/apps/pets'],
          },
          {
            label: 'Pets Management',
            icon: 'fa-solid fa-list-check',
            routerLink: ['/apps/pets/list'],

          },
          {
            label: 'User management',
            icon: 'fa-solid fa-user-nurse',
            routerLink:[ '/apps/plates/users/list']
          }
        ],
      },

    ];
  }
}
