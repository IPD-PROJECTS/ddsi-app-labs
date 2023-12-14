import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export * from '../lib/checkStatusPlateItem/checkStatusPlateItem.pipe'
export * from '../lib/findPlateItemByPosition/findPlateItemByPosition.pipe'
export * from '../lib/getLabelOfPlateItem/getLabelOfPlateItem.pipe'
export * from '../lib/getListPlatePostion/getListPlatePosition.pipe'
export * from '../lib/isPatientAlreadyAdded/isPatientAlreadyAdded.pipe'
export * from '../lib/labelOfPlateItemFilled/labelOfPlateItemFilled.pipe'
export * from '../lib/nextCaracter/nextCaracter.pipe'

@NgModule({
  imports: [CommonModule],
})
export class PipesModule {}
