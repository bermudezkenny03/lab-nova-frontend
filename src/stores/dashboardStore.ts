import { defineStore } from 'pinia'
import { dashboardService } from '@/services/dashboardService'

interface MonthlyData {
  month: string
  count: number
}

interface CategoryData {
  name: string
  count: number
}

interface StatusData {
  name: string
  count: number
}

interface ActivityItem {
  id: number
  type: 'reservation' | 'report'
  title: string
  user: string
  status: string
  created_at: string
}

interface DashboardState {
  usersCount: number
  equipmentCount: number
  equipmentActive: number
  reservationsCount: number
  reservationsPending: number
  reservationsApproved: number
  reportsCount: number
  monthlyReservations: MonthlyData[]
  equipmentByCategory: CategoryData[]
  equipmentByStatus: StatusData[]
  recentActivity: ActivityItem[]
  loading: boolean
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    usersCount: 0,
    equipmentCount: 0,
    equipmentActive: 0,
    reservationsCount: 0,
    reservationsPending: 0,
    reservationsApproved: 0,
    reportsCount: 0,
    monthlyReservations: [],
    equipmentByCategory: [],
    equipmentByStatus: [],
    recentActivity: [],
    loading: false,
  }),

  actions: {
    async fetchDashboardData() {
      this.loading = true
      try {
        const response = await dashboardService.getDashboardData()
        if (response?.data) {
          const data = response.data
          this.usersCount = data.users_count || 0
          this.equipmentCount = data.equipment_count || 0
          this.equipmentActive = data.equipment_active || 0
          this.reservationsCount = data.reservations_count || 0
          this.reservationsPending = data.reservations_pending || 0
          this.reservationsApproved = data.reservations_approved || 0
          this.reportsCount = data.reports_count || 0
          this.monthlyReservations = data.monthly_reservations || []
          this.equipmentByCategory = data.equipment_by_category || []
          this.equipmentByStatus = data.equipment_by_status || []
          this.recentActivity = data.recent_activity || []
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
