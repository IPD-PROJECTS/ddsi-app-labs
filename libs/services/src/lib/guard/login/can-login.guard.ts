import { CanActivateFn, Router } from '@angular/router';
import { LoginResponse } from '@ddsi-labs-apps/models';
import { ApplicationRoutingService, LocalStorageService, STORAGE_KEYS } from '../../services.module';

export const canLoginGuard: CanActivateFn = (route, state) => {
  const localStorage = new LocalStorageService();
  const appNav = new ApplicationRoutingService(new Router());
  const authInfos: LoginResponse = localStorage.getFromLocalStorage(STORAGE_KEYS.AUTH_INFOS);

  if(authInfos) {
    appNav.goToPlatesApp();
    return true;
  }
  return true;
};
