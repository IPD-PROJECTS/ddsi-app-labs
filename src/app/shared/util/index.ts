export enum ENV_KEY {
    BASE_URL = 'NX_BASE_API_URL'
}

export enum ITEM_TYPE {
    CONTROL = 'control',
    PATIENT = 'patient'
  }

 export enum Result {
    FILLED = 'filled',
    EMPTY = ''
  }

  export const PATIENT_FILE_LIST_MAX_SIZE = 5 * 1000000;
  export const PLATE_PLAN_FILE_MAX_SIZE = 5 * 1000000;