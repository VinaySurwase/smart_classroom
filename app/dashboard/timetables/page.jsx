import AuthGuard from "@/components/auth-guard"
import DashboardLayout from "@/components/dashboard-layout"
import TimetableGenerator from "@/components/timetable-generator"

export default function TimetablesPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <TimetableGenerator />
      </DashboardLayout>
    </AuthGuard>
  )
}
