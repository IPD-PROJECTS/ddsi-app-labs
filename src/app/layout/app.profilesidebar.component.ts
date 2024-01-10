import { Component } from '@angular/core';
import { AuthenticationService, LayoutService, LocalStorageService, STORAGE_KEYS } from '@ddsi-labs-apps/services';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-profilemenu',
    standalone: true,
    imports: [CommonModule, SidebarModule, RouterModule],
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent {
    userName = "";
    constructor(public layoutService: LayoutService, private router: Router, private authService: AuthenticationService, private storage: LocalStorageService) {
        this.userName = storage.getFromLocalStorage(STORAGE_KEYS.USERNAME);
    }

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']).then((_) => this.visible = false)
    }
}