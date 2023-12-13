import { signal } from "@angular/core";
import _ from "lodash";

export interface PlateModel {
  id?: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
  plate_type?: number;
  created_by?: string;
  controls?: any[];
  patients?: any[];
}

export const plateDetailsSignal = signal(<PlateModel | undefined>undefined, {equal: _.isEqual});