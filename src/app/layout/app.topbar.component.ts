import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { CommonModule } from '@angular/common';
import { AppMenuComponent } from './app.menu.component';
import { InputTextModule } from "primeng/inputtext";
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AvatarModule } from 'primeng/avatar';
@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [CommonModule, AppMenuComponent, AppBreadcrumbComponent, InputTextModule, AvatarModule],
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;

    constructor(public layoutService: LayoutService) { }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
    }

}