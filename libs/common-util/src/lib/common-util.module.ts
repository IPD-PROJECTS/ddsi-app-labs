import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export * from '../lib/constantes';
export * from '../lib/modal-select-item-for-plate/modal-select-item-for-plate.component';
export * from '../lib/plate-plan-preview-block/plate-plan-preview-block.component'
@NgModule({
  imports: [CommonModule],
})
export class CommonUtilModule {}
