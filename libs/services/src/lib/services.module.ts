import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
export * from '../lib/services/application-routing/application-routing.service'
export * from '../lib/services/controls/controls.service'
export * from '../lib/services/local-storage/local-storage.service'
export * from '../lib/services/notification/notification.service'
export * from '../lib/services/patient/patient.service'
export * from '../lib/services/plate-type/plate-type.service'
export * from '../lib/services/process-result/process-result.service'
export * from '../lib/services/plate-plan/plate-plan.service'
export * from '../lib/services/layout/app.layout.service'

@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class ServicesModule {}
