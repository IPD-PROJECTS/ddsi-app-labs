import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export * from './plateTypeById/plateTypeById.pipe';
export * from './checkStatusPlateItem/checkStatusPlateItem.pipe';
export * from './findPlateItemByPosition/findPlateItemByPosition.pipe';
export * from './getLabelOfPlateItem/getLabelOfPlateItem.pipe';
export * from './getListPlatePostion/getListPlatePosition.pipe';
export * from './isPatientAlreadyAdded/isPatientAlreadyAdded.pipe';
export * from './labelOfPlateItemFilled/labelOfPlateItemFilled.pipe';
export * from './nextCaracter/nextCaracter.pipe';

@NgModule({
  imports: [CommonModule],
})
export class PipesModule {}
