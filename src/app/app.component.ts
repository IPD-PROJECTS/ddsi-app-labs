import { Component, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { notificationSignal } from '@ddsi-labs-apps/models';
import { Message, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  providers: [MessageService],
  imports: [RouterModule, ToastModule],
  selector: 'ddsi-labs-apps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ddsi-labs-apps';
  constructor(private messageService: MessageService){
    effect(() => {
      const notification: Message | undefined = notificationSignal();      
      if (notification) {
        this.messageService.add(notification);
      }
    });
  }
}
