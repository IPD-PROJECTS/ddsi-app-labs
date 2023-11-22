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
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Summary',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/plates'],
          },
          {
            label: 'Plate Management',
            icon: 'pi pi-fw pi-list',
            items: [
              {
                label: 'List Plate Type',
                icon: 'pi pi-fw pi-list',
                routerLink:[ '/plates/list-plate-type']
              },
              {
                label: 'Create Plate Type',
                icon: 'pi pi-fw pi-plus',
                routerLink:[ '/plates/create-plate-type'],
                state: { type: 'ADD'}
              },
              {
                label: 'List Plate plan',
                icon: 'pi pi-fw pi-plus',
                routerLink:[ '/plates/list-plate-plan'],
              },
              {
                label: 'Create Plate plan',
                icon: 'pi pi-fw pi-plus',
                routerLink:[ '/plates/list-plate-plan'],
                state: { type: 'ADD'}
              }
            ]
          },
          {
            label: 'Patient Management',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/plates/patients'],
            items: [
              {
                label: 'Add patient',
                icon: 'pi pi-fw pi-plus',
              }
          ]
          },
          {
            label: 'Create Plate Plan',
            icon: 'pi pi-fw pi-building',
            routerLink: ['/plates/plates-patients']
          }
        ],
      },

      // {
      //   label: 'User Management',
      //   icon: 'pi pi-fw pi-user',
      //   items: [
      //     {
      //       label: 'List',
      //       icon: 'pi pi-fw pi-list',
      //       routerLink: ['profile/list'],
      //     },
      //     {
      //       label: 'Create',
      //       icon: 'pi pi-fw pi-plus',
      //       routerLink: ['profile/create'],
      //     },
      //   ],
      // },
    ];
  }
}
