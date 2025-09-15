"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Calendar,
  Users,
  Clock,
  Zap,
  Shield,
  BarChart3,
  CheckCircle,
  Star,
  Building,
  UserPlus,
  LogIn,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Scheduling",
      description: "Advanced algorithms optimize classroom allocation and minimize conflicts automatically",
    },
    {
      icon: Shield,
      title: "Conflict Resolution",
      description: "Intelligent detection and resolution of scheduling conflicts in real-time",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into resource utilization and scheduling efficiency",
    },
    {
      icon: Users,
      title: "Multi-Department Support",
      description: "Seamlessly manage schedules across multiple departments and faculties",
    },
  ]

  const stats = [
    { label: "Universities Using", value: "500+", icon: Building },
    { label: "Schedules Generated", value: "10K+", icon: Calendar },
    { label: "Time Saved Daily", value: "8hrs", icon: Clock },
    { label: "Satisfaction Rate", value: "98%", icon: Star },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SmartScheduler
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Live Demo
              </Badge>
              <Button
                variant="ghost"
                onClick={() => router.push("/auth/signin")}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button onClick={() => router.push("/auth/signup")} className="bg-blue-600 hover:bg-blue-700 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Next-Generation Scheduling Platform
            </div>

            <h1 className="text-6xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Smart Classroom &
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Timetable Scheduler
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
              Transform your educational institution with our revolutionary AI-powered scheduling system. Optimize
              classroom allocation, faculty assignments, and student timetables with unprecedented efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                onClick={() => router.push("/auth/signup")}
                className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/auth/signin")}
                className="h-14 px-8 text-lg border-2 hover:bg-blue-50 text-gray-700"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Sign In to Dashboard
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mb-3">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage complex scheduling requirements with ease
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Try Our Demo</h2>
          <p className="text-gray-600 mb-8">Experience the full power of SmartScheduler with our interactive demo</p>
          <div className="bg-white rounded-lg p-6 shadow-lg inline-block">
            <p className="text-sm text-gray-700 font-medium mb-4">Demo Credentials:</p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="text-sm">
                Username: <code className="bg-blue-100 px-3 py-1 rounded text-blue-800 font-mono">admin</code>
              </div>
              <div className="text-sm">
                Password: <code className="bg-blue-100 px-3 py-1 rounded text-blue-800 font-mono">admin123</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">SmartScheduler</span>
          </div>
          <p className="text-gray-400">© 2024 SmartScheduler. Revolutionizing educational scheduling worldwide.</p>
        </div>
      </footer>
    </div>
  )
}
