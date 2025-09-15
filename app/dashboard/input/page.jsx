import AuthGuard from "@/components/auth-guard"
import DashboardLayout from "@/components/dashboard-layout"
import DataInputForm from "@/components/data-input-form"

export default function DataInputPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <DataInputForm />
      </DashboardLayout>
    </AuthGuard>
  )
}
