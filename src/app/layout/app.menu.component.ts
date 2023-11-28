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
            routerLink: ['/apps/plates'],
          },
          {
            label: 'Plate Management',
            icon: 'pi pi-fw pi-cog',
            items: [
              {
                label: 'List Plate Type',
                icon: 'pi pi-fw pi-list',
                routerLink:[ '/apps/plates/list-plate-type']
              },
              {
                label: 'Create Plate Type',
                icon: 'pi pi-fw pi-plus',
                routerLink:[ '/apps/plates/create-plate-type'],
                state: { type: 'ADD'}
              }
            ]
          },
          {
            label: 'Patient Management',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/apps/plates/patients'],
            items: [
              {
                label: 'List patients',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/apps/plates/patients/list']
              }
          ]
          },
          {
            label: 'Plate plan Management',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'List Plate plan',
                icon: 'pi pi-fw pi-list',
                routerLink:[ '/apps/plates/plate-plan/list'],
              },
              {
                label: 'Create a Plate plan',
                icon: 'pi pi-fw pi-plus',
                routerLink:[ '/apps/plates/plate-plan/create'],
                state: { type: 'ADD'}
              },
              {
                label: 'Import to add Plate plan',
                icon: 'pi pi-fw pi-cloud-upload',
                routerLink:[ '/apps/plates/plate-plan/create'],
                state: { type: 'ADD'}
              }
            ]
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
