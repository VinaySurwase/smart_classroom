import AuthGuard from "@/components/auth-guard"
import DashboardLayout from "@/components/dashboard-layout"
import ReviewApprovalSystem from "@/components/review-approval-system"

export default function ReviewPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ReviewApprovalSystem />
      </DashboardLayout>
    </AuthGuard>
  )
}
