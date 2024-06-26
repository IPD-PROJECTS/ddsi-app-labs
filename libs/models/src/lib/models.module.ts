import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export * from '../lib/models/controls.model'
export * from '../lib/models/notification.model'
export * from '../lib/models/patient.model'
export * from '../lib/models/plate-type.model'
export * from '../lib/models/plate.model'
export * from '../lib/models/position.model'
export * from '../lib/models/appConfig.model'
export * from '../lib/models/authentication.model'
export * from '../lib/models/stats.model'
export * from '../lib/models/plate-type-test.model'
export * from '../lib/models/sample.model'
export * from '../lib/models/sample-analysis.model'
export * from '../lib/models/case-details.model'
@NgModule({
  imports: [CommonModule],
})
export class ModelsModule {}
