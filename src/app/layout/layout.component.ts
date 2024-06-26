import {
  Component,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, filter } from 'rxjs';
import { LayoutService } from '@ddsi-labs-apps/services';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppTopbarComponent } from './app.topbar.component';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MenuService } from './app.menu.service';
import { AppProfileSidebarComponent } from './app.profilesidebar.component';
import { AppConfigComponent } from './config/app.config.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'ddsi-labs-apps-layout',
  standalone: true,
  imports: [
    CommonModule,
    AppConfigComponent,
    AppBreadcrumbComponent,
    AppProfileSidebarComponent,
    AppTopbarComponent,
    AppSidebarComponent,
    RouterModule
  ],
  providers: [MessageService],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  overlayMenuOpenSubscription: Subscription;

  menuOutsideClickListener: any;

  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

  @ViewChild(AppTopbarComponent) appTopbar!: AppTopbarComponent;

  constructor(
    private messageService: MessageService,
    private menuService: MenuService,
    public layoutService: LayoutService,
    public renderer: Renderer2,
    public router: Router
  ) {    
    this.overlayMenuOpenSubscription =
      this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen(
            'document',
            'click',
            (event) => {
              const isOutsideClicked = !(
                this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                this.appSidebar.el.nativeElement.contains(event.target) ||
                this.appTopbar.menuButton.nativeElement.isSameNode(
                  event.target
                ) ||
                this.appTopbar.menuButton.nativeElement.contains(event.target)
              );
              if (isOutsideClicked) {
                this.hideMenu();
              }
            }
          );
        }

        if (this.layoutService.state.staticMenuMobileActive) {
          this.blockBodyScroll();
        }
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
      });
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    this.menuService.reset();
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  get containerClass() {
    return {
      'layout-light': this.layoutService.config.colorScheme === 'light',
      'layout-dark': this.layoutService.config.colorScheme === 'dark',
      'layout-colorscheme-menu':
        this.layoutService.config.menuTheme === 'colorScheme',
      'layout-primarycolor-menu':
        this.layoutService.config.menuTheme === 'primaryColor',
      'layout-transparent-menu':
        this.layoutService.config.menuTheme === 'transparent',
      'layout-overlay': this.layoutService.config.menuMode === 'overlay',
      'layout-static': this.layoutService.config.menuMode === 'static',
      'layout-slim': this.layoutService.config.menuMode === 'slim',
      'layout-horizontal': this.layoutService.config.menuMode === 'horizontal',
      'layout-reveal': this.layoutService.config.menuMode === 'reveal',
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config.ripple,
      'layout-reveal-active': this.layoutService.state.revealMenuActive,
      'layout-reveal-anchored': this.layoutService.state.anchored,
    };
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
