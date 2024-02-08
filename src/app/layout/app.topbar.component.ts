import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService, LocalStorageService, STORAGE_KEYS } from '@ddsi-labs-apps/services';
import { CommonModule } from '@angular/common';
import { AppMenuComponent } from './app.menu.component';
import { InputTextModule } from "primeng/inputtext";
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [CommonModule, AppMenuComponent, AppBreadcrumbComponent, InputTextModule, AvatarModule, ButtonModule],
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {
    userName = "";
    @ViewChild('menubutton') menuButton!: ElementRef;

    constructor(public layoutService: LayoutService, private storage: LocalStorageService) {
        this.userName = storage.getFromLocalStorage(STORAGE_KEYS.USERNAME);
     }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
    }

}