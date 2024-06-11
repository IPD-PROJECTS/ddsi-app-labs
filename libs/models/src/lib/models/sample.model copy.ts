import { AnalysisType } from "./sample-analysis.model"

export interface Sample {
    id: string,
    laboDetails: any,
    sampleOrigine: any,
    reception: any,
    status: string,
    comments: string
    sampleType: string,
    sampleContext: string,
    registeredBy: string,
    registrationDate: string,
    analyses: AnalysisType[]
  }
