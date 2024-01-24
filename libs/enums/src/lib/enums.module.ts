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
  created_at = 'Date de création',
  updated_at = 'Date de mise à jour',
  created_by = 'Crée par',
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

export enum PLATE_TYPE_ATTRIBUTE {
  name = 'label',
  number_rows = 'number_rows',
  number_cols = 'number_cols',
  created_at = 'created_at',
  updated_at = 'updated_at',
  author = 'created_by'
}

export enum PLATE_TYPE_ATTRIBUTE_LABEL {
  name = 'Label',
  number_rows = 'Nombre de lignes',
  number_cols = 'Nombre de colonnes',
  created_at = 'Crée le',
  updated_at = 'Mise à jour le',
  author = 'Auteur'
}

export enum PATIENT_ATTRIBUTE {
  ANON_NAME = 'anon_name',
  FIRSTNAME = 'first_name',
  LASTNAME = 'last_name',
  BIRTHDATE = 'birth_date',
}

export interface TableColumn {
  field: string;
  header: string;
}

export enum Plate_Settings_Step {
  INIT = 'INIT',
  FILL_PLATE = 'FILL_PLATE',
  IMPORT_RESULT = 'IMPORT_RESULT',
}

export enum FORMAT {
  ZIP = 'application/zip',
  PNG = 'image/png',
  EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  JSON = 'application/json'
}

export enum GENDER {
  MALE = 'M',
  FEMALE = 'F'
}

export enum CONTROLS {
  NEG = 'NEG',
  POS = 'POS',
  WHITE = 'BLANC'
}
@NgModule({
  imports: [CommonModule],
})
export class EnumsModule {}
