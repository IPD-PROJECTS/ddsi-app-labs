import { CanDeactivateFn } from '@angular/router';
import { LocalStorageService, STORAGE_KEYS } from '../../services.module';
import { LoginResponse } from '@ddsi-labs-apps/models';

export const alreadyLoggedInGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const localStorage = new LocalStorageService();
  const authInfos: LoginResponse = localStorage.getFromLocalStorage(STORAGE_KEYS.AUTH_INFOS);

  if(authInfos) return false;
  return true
};
