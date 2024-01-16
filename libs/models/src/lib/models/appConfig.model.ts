import { InjectionToken } from "@angular/core";

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
    menuTheme: string;
}

export interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
    revealMenuActive: boolean;
    anchored: boolean,
}


export type AppInputConfig = {
    apiUrl: string;
    // Set this up in any way you like!
  };

  export const APP_CONFIG: InjectionToken<AppInputConfig> = new InjectionToken<AppInputConfig>(
    'Application Config'
  );