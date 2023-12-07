import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private message: MessageService) { }

  displayNotification(sucess: boolean, title: string, message: string) {
    this.message.add({ severity: sucess ? 'success' : 'error', summary: title, detail: message});
  }
}
