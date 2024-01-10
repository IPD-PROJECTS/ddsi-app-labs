import { CanActivateFn } from '@angular/router';
import { LocalStorageService, STORAGE_KEYS } from '../../services.module';
import { LoginResponse } from '@ddsi-labs-apps/models';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const localStorage = new LocalStorageService();
  const authInfos: LoginResponse = localStorage.getFromLocalStorage(STORAGE_KEYS.AUTH_INFOS);
  console.log('authenticatedGuard ');

  if(authInfos) {
    return true;
  } else {
    return false;
  }
};
