import { Component, ElementRef } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuComponent } from './app.menu.component';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, AppMenuComponent],
    templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent {
    timeout: any = null;


    constructor(public layoutService: LayoutService, public el: ElementRef) { }

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
