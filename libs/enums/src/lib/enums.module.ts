import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export enum NotificationSeverity {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}
export enum LabelType {
  LETTER = 'Letter',
  NUMBER = 'Number',
}
export enum PlateFillingType {
  COLUMN = 'Column',
  ROW = 'Row',
}

export enum PLATE_ATTRIBUTE {
  id = 'id',
  patients = 'patients',
  controls = 'controls',
  description = 'description',
  created_at = 'created_at',
  updated_at = 'updated_at',
  created_by = 'created_by',
}

export enum PLATE_LABEL {
  id = 'Id',
  patients = 'Nombre de patients',
  controls = 'Nombre de controls',
  description = 'Description',
  created_at = 'Created at',
  updated_at = 'Updated at',
  created_by = 'Created by',
}

export enum ENV_KEY {
  BASE_URL = 'NX_BASE_API_URL',
}

export enum ITEM_TYPE {
  CONTROL = 'control',
  PATIENT = 'patient',
}

export enum Result {
  FILLED = 'filled',
  EMPTY = '',
}

@NgModule({
  imports: [CommonModule],
})
export class EnumsModule {}
