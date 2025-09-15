"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Building, BookOpen, Clock, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardOverview() {
  const router = useRouter()

  const stats = [
    {
      title: "Total Classrooms",
      value: "24",
      description: "Available rooms",
      icon: Building,
      color: "text-blue-600",
    },
    {
      title: "Faculty Members",
      value: "156",
      description: "Active teachers",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Subjects",
      value: "89",
      description: "This semester",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "Active Timetables",
      value: "12",
      description: "Generated this week",
      icon: Calendar,
      color: "text-orange-600",
    },
  ]

  const recentActivities = [
    {
      action: "Timetable generated for Computer Science Dept",
      time: "2 hours ago",
      status: "success",
    },
    {
      action: "Room conflict detected in Block A",
      time: "4 hours ago",
      status: "warning",
    },
    {
      action: "New faculty member added - Dr. Smith",
      time: "1 day ago",
      status: "info",
    },
    {
      action: "Timetable approved for Mathematics Dept",
      time: "2 days ago",
      status: "success",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-lg text-primary-foreground">
        <h1 className="text-2xl font-bold mb-2">Welcome to Smart Classroom Scheduler</h1>
        <p className="text-primary-foreground/90">
          Manage your institution's timetables efficiently with our intelligent scheduling system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Button
              variant="outline"
              className="h-20 flex-col bg-transparent"
              onClick={() => router.push("/dashboard/input")}
            >
              <Settings className="h-6 w-6 mb-2" />
              Input Data
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col bg-transparent"
              onClick={() => router.push("/dashboard/timetables")}
            >
              <Calendar className="h-6 w-6 mb-2" />
              Generate Timetable
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col bg-transparent"
              onClick={() => router.push("/dashboard/review")}
            >
              <Clock className="h-6 w-6 mb-2" />
              Review Schedules
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest updates and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.status === "success"
                      ? "bg-green-500"
                      : activity.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
