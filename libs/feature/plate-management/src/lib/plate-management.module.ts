import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { plateManagementRoutes } from './lib.routes';
import { MessageService } from 'primeng/api';
import { NotificationService } from '@ddsi-labs-apps/services';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(plateManagementRoutes)],
  providers:[MessageService, NotificationService]
})
export class PlateManagementModule {}
