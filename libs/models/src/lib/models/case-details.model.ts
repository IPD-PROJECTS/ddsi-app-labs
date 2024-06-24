import { AnalysisType } from "./sample-analysis.model"

export interface CaseDetails {
    id: string,
    epidNumber: string,
    registrationDate: string,
    caseInfos: {
      classification: string
      disease: string
      quarantaineStatus: string
      adresse: string
      healthDistrict: string
      surveillanceAgent: any
    },
    caseInvestigation?: {
      selectedSymptomes?: string[],
      symptomesDetails?: {fieldLabel: string, fieldValue: string}[],
      comments?: string
    },
    history?: {
      selectedMedicalIssues?: string[],
      medicalIssuesDetails?: {fieldLabel: string, fieldValue: string}[]
    }
  }
