import { Component, ElementRef, OnInit } from '@angular/core';
import { LayoutService } from '@ddsi-labs-apps/services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuComponent } from './app.menu.component';
import { AppConfig } from '@ddsi-labs-apps/models';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, AppMenuComponent],
    templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent implements OnInit {
    timeout: any = null;
    appConfig?: AppConfig;

    constructor(public layoutService: LayoutService, public el: ElementRef) {

    }
    ngOnInit(): void {
        this.layoutService.configUpdate$.subscribe({
            next:(conf: AppConfig) => {
                this.appConfig = conf;
            }
        })
    }
    onMouseEnter() {
        if (!this.layoutService.state.anchored) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.layoutService.state.revealMenuActive = true;
        }
    }

    onMouseLeave() {
        if (!this.layoutService.state.anchored) {
            if (!this.timeout) {
                this.timeout = setTimeout(() => this.layoutService.state.revealMenuActive = false, 300);
            }
        }
    }

    anchor() {
        this.layoutService.state.anchored = !this.layoutService.state.anchored;
    }

}
