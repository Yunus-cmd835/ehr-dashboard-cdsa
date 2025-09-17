import { create } from 'zustand'

interface DashboardState {
  selectedDiagnosis: string
  chartType: 'bar' | 'pie'
  setDiagnosis: (d: string) => void
  setChartType: (type: 'bar' | 'pie') => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedDiagnosis: 'All',
  chartType: 'bar',
  setDiagnosis: (d) => set({ selectedDiagnosis: d }),
  setChartType: (type) => set({ chartType: type })
}))