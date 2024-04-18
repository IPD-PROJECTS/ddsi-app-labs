import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from '../lib/constantes';
export * from '../lib/modal-select-item-for-plate/modal-select-item-for-plate.component';
export * from '../lib/plate-plan-preview-block/plate-plan-preview-block.component';
export * from '../lib/patient-add/patient-add.component'
export * from '../lib/add-patient-dynamic-form/add-patient-dynamic-form.component'
@NgModule({
  imports: [CommonModule],
})
export class CommonUtilModule {}
