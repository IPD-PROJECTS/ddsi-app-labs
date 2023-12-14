import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { notificationSignal } from '@ddsi-labs-apps/models';
import { NotificationSeverity } from '@ddsi-labs-apps/enums';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private message: MessageService) { }

  displayNotification(severity: NotificationSeverity, title: string, message: string) {
    notificationSignal.set({severity, summary:title, detail: message});
    // this.message.add({ severity: sucess ? 'success' : 'error', summary: title, detail: message});
  }
}
