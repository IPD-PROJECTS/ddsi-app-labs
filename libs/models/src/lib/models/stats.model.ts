export interface DashboardStatesModel{
    results: statsData
}

export interface statsData {
    patients_count: number,
        plates_count: number,
        patients_count_per_gender: {sex: string, count: number} [],
        plates_without_result_file: number,
        plates_count_per_test: {test: string, count: number}[],
        plates_count_per_group: any
}