import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reportService } from '@/services/reportService'
import type { ReportRequest, ReportRequestType } from '@/utils/interfaces'

export const useReportStore = defineStore('report', () => {
  const reportRequests = ref<ReportRequest[]>([])
  const reportTypes = ref<ReportRequestType[]>([])
  const loadingList = ref<boolean>(false)

  const fetchReportRequests = async (): Promise<void> => {
    try {
      loadingList.value = true
      const response = await reportService.getReportRequests()
      reportRequests.value = response.data ?? []
    } catch (error) {
      console.error('Error fetching report requests:', error)
    } finally {
      loadingList.value = false
    }
  }

  const fetchReportTypes = async (): Promise<void> => {
    try {
      const response = await reportService.getReportRequestGeneralData()
      reportTypes.value = response.data?.types ?? []
    } catch (error) {
      console.error('Error fetching report types:', error)
    }
  }

  const deleteReportRequest = async (id: number): Promise<boolean> => {
    try {
      const response = await reportService.deleteReportRequest(id.toString())
      if (response) {
        reportRequests.value = reportRequests.value.filter((req) => req.id !== id)
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting report request:', error)
      return false
    }
  }

  const deleteMultipleReportRequests = async (ids: number[]): Promise<number> => {
    let successCount = 0
    for (const id of ids) {
      const result = await deleteReportRequest(id)
      if (result) successCount++
    }
    return successCount
  }

  const generateReportRequest = async (id: number, format: string = 'csv'): Promise<boolean> => {
    try {
      await reportService.generateReport(id, format)
      return true
    } catch (error) {
      console.error('Error generating report:', error)
      throw error
    }
  }

  return {
    reportRequests,
    reportTypes,
    loadingList,
    fetchReportRequests,
    fetchReportTypes,
    deleteReportRequest,
    deleteMultipleReportRequests,
    generateReportRequest,
  }
})
