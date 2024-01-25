import { Injectable } from '@angular/core';
import * as SecureLS from 'secure-ls';

const ls = new SecureLS({encodingType: 'aes'});

export const STORAGE_KEYS = {
  AUTH_INFOS : 'auth',
  USERNAME: 'username',
  APP_LAYOUT_CONFIG: 'app_layout_config'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  saveToLocalStorage(key: string, data: any) {
    ls.set(key, data);
  }

  getFromLocalStorage(key: string) {
    return ls.get(key);
  }

  deleteKeyFromLocalStorage(key: string) {
    ls.remove(key);
  }

  cleanStorage() {
    ls.clear()
  }
}
