import { CanActivateFn, Router } from '@angular/router';
import { ApplicationRoutingService, LocalStorageService, STORAGE_KEYS } from '../../services.module';
import { LoginResponse } from '@ddsi-labs-apps/models';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const localStorage = new LocalStorageService();
  const appNav = new ApplicationRoutingService(new Router())
  const authInfos: LoginResponse = localStorage.getFromLocalStorage(STORAGE_KEYS.AUTH_INFOS);

  if(authInfos) {
    return true;
  } else {
    appNav.goToLogin();
    return false;
  }
};
