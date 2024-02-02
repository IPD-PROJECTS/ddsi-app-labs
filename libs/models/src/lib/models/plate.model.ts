import { signal } from "@angular/core";
import _ from "lodash";
import { PlateTypeTestModel } from "./plate-type-test.model";

export interface PlateModel {
  id?: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
  plate_type?: number;
  created_by?: string;
  test?: number;
  test_details?: PlateTypeTestModel;
  controls?: any[];
  patients?: any[];
  excel_spectro_file?: any;
}

export const plateDetailsSignal = signal(<PlateModel | undefined>undefined, {equal: _.isEqual});