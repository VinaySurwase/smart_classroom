"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Building, Plus, Search, Edit, Trash2, Users, Monitor, Wifi } from "lucide-react"
import { dummyData } from "@/lib/dummy-data"
import AuthGuard from "@/components/auth-guard"
import DashboardLayout from "@/components/dashboard-layout"

function ClassroomsContent() {
  const [classrooms, setClassrooms] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBuilding, setSelectedBuilding] = useState("all")

  useEffect(() => {
    setClassrooms(dummyData.classrooms)
  }, [])

  const filteredClassrooms = classrooms.filter((classroom) => {
    const matchesSearch =
      classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.building.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBuilding = selectedBuilding === "all" || classroom.building === selectedBuilding
    return matchesSearch && matchesBuilding
  })

  const buildings = [...new Set(classrooms.map((c) => c.building))]

  const getTypeColor = (type) => {
    switch (type) {
      case "Lecture Hall":
        return "bg-blue-100 text-blue-800"
      case "Laboratory":
        return "bg-green-100 text-green-800"
      case "Seminar Room":
        return "bg-purple-100 text-purple-800"
      case "Computer Lab":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Classrooms Management</h1>
          <p className="text-gray-600 mt-2">Manage all classrooms and their facilities</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Classroom
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classrooms</CardTitle>
            <Building className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classrooms.length}</div>
            <p className="text-xs text-muted-foreground">Available rooms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buildings</CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buildings.length}</div>
            <p className="text-xs text-muted-foreground">Different buildings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classrooms.reduce((sum, c) => sum + c.capacity, 0)}</div>
            <p className="text-xs text-muted-foreground">Student seats</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Smart Rooms</CardTitle>
            <Monitor className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classrooms.filter((c) => c.facilities.includes("Smart Board")).length}
            </div>
            <p className="text-xs text-muted-foreground">With smart boards</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Classrooms</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name or building..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Label htmlFor="building">Building</Label>
              <select
                id="building"
                value={selectedBuilding}
                onChange={(e) => setSelectedBuilding(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-md"
              >
                <option value="all">All Buildings</option>
                {buildings.map((building) => (
                  <option key={building} value={building}>
                    {building}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Classrooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClassrooms.map((classroom) => (
          <Card key={classroom.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{classroom.name}</CardTitle>
                <Badge className={getTypeColor(classroom.type)}>{classroom.type}</Badge>
              </div>
              <CardDescription>
                {classroom.building} • Floor {classroom.floor}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Capacity</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{classroom.capacity}</span>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-600 block mb-2">Facilities</span>
                  <div className="flex flex-wrap gap-1">
                    {classroom.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    {classroom.facilities.includes("WiFi") && <Wifi className="h-4 w-4 text-green-500" />}
                    {classroom.facilities.includes("Smart Board") && <Monitor className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function ClassroomsPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ClassroomsContent />
      </DashboardLayout>
    </AuthGuard>
  )
}
