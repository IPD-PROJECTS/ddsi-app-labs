export interface AnalysisType {
  id: string;
  typeTest: string | undefined;
  diseaseToTest: string | undefined;
  hasResult: boolean;
  status?: string;
  dateResult?: string;
  resultValue?: string;
  comments?: string;
  registeredBy: string;
  registrationDate: string;
}
