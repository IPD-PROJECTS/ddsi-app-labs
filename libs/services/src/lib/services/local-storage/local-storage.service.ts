import { Injectable } from '@angular/core';
import * as SecureLS from 'secure-ls';

const ls = new SecureLS({encodingType: 'aes'});

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  saveToLocalStorage(key: string, data: any) {
    ls.set(key, data);
  }

  getFromLocalStorage(key: string) {
    ls.get(key);
  }

  deleteKeyFromLocalStorage(key: string) {
    ls.remove(key);
  }

  cleanStorage() {
    ls.clear()
  }
}
