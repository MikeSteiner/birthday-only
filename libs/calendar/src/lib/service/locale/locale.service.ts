import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  getBrowserLanguage(): string {
    const userLang: string = window.navigator.language || window.navigator['language'];
    return userLang;
  }

}
