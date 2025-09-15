"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Trash2, Save, CheckCircle, RefreshCw } from "lucide-react"
import { dummyClassrooms, dummyFaculty, dummySubjects, dummyBasicData } from "@/lib/dummy-data"

export default function DataInputForm() {
  const [activeTab, setActiveTab] = useState("basic")
  const [showSuccess, setShowSuccess] = useState(false)

  const [basicData, setBasicData] = useState(dummyBasicData)
  const [classrooms, setClassrooms] = useState(dummyClassrooms)
  const [faculty, setFaculty] = useState(dummyFaculty)
  const [subjects, setSubjects] = useState(dummySubjects)

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("schedulerData")
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setBasicData(parsed.basicData || dummyBasicData)
      setClassrooms(parsed.classrooms || dummyClassrooms)
      setFaculty(parsed.faculty || dummyFaculty)
      setSubjects(parsed.subjects || dummySubjects)
    }
  }, [])

  const loadDummyData = () => {
    setBasicData(dummyBasicData)
    setClassrooms(dummyClassrooms)
    setFaculty(dummyFaculty)
    setSubjects(dummySubjects)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleBasicDataChange = (field, value) => {
    setBasicData((prev) => ({ ...prev, [field]: value }))
  }

  const addClassroom = () => {
    setClassrooms((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        capacity: "",
        type: "lecture",
        building: "",
        floor: "",
      },
    ])
  }

  const removeClassroom = (id) => {
    setClassrooms((prev) => prev.filter((room) => room.id !== id))
  }

  const updateClassroom = (id, field, value) => {
    setClassrooms((prev) => prev.map((room) => (room.id === id ? { ...room, [field]: value } : room)))
  }

  const addFaculty = () => {
    setFaculty((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        subjects: [""],
        maxHoursPerDay: "",
        avgLeavesPerMonth: "",
      },
    ])
  }

  const removeFaculty = (id) => {
    setFaculty((prev) => prev.filter((f) => f.id !== id))
  }

  const updateFaculty = (id, field, value) => {
    setFaculty((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)))
  }

  const addSubject = () => {
    setSubjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        code: "",
        hoursPerWeek: "",
        type: "theory",
        department: "",
      },
    ])
  }

  const removeSubject = (id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id))
  }

  const updateSubject = (id, field, value) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const handleSave = () => {
    // Save data to localStorage for demo purposes
    const allData = {
      basicData,
      classrooms,
      faculty,
      subjects,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("schedulerData", JSON.stringify(allData))
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Data Input</h1>
          <p className="text-muted-foreground">Configure parameters for timetable generation</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadDummyData} variant="outline" className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Load Sample Data
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save All Data
          </Button>
        </div>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">All data has been saved successfully!</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Parameters</TabsTrigger>
          <TabsTrigger value="classrooms">Classrooms ({classrooms.length})</TabsTrigger>
          <TabsTrigger value="faculty">Faculty ({faculty.length})</TabsTrigger>
          <TabsTrigger value="subjects">Subjects ({subjects.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Parameters</CardTitle>
              <CardDescription>Set the fundamental parameters for your institution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalClassrooms">Total Classrooms Available</Label>
                  <Input
                    id="totalClassrooms"
                    type="number"
                    placeholder="e.g., 24"
                    value={basicData.totalClassrooms}
                    onChange={(e) => handleBasicDataChange("totalClassrooms", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalBatches">Number of Student Batches</Label>
                  <Input
                    id="totalBatches"
                    type="number"
                    placeholder="e.g., 12"
                    value={basicData.totalBatches}
                    onChange={(e) => handleBasicDataChange("totalBatches", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalSubjects">Total Subjects</Label>
                  <Input
                    id="totalSubjects"
                    type="number"
                    placeholder="e.g., 45"
                    value={basicData.totalSubjects}
                    onChange={(e) => handleBasicDataChange("totalSubjects", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxClassesPerDay">Max Classes Per Day</Label>
                  <Input
                    id="maxClassesPerDay"
                    type="number"
                    placeholder="e.g., 8"
                    value={basicData.maxClassesPerDay}
                    onChange={(e) => handleBasicDataChange("maxClassesPerDay", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select
                    value={basicData.semester}
                    onValueChange={(value) => handleBasicDataChange("semester", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Semester 1</SelectItem>
                      <SelectItem value="2">Semester 2</SelectItem>
                      <SelectItem value="3">Semester 3</SelectItem>
                      <SelectItem value="4">Semester 4</SelectItem>
                      <SelectItem value="5">Semester 5</SelectItem>
                      <SelectItem value="6">Semester 6</SelectItem>
                      <SelectItem value="7">Semester 7</SelectItem>
                      <SelectItem value="8">Semester 8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input
                    id="academicYear"
                    placeholder="e.g., 2024-25"
                    value={basicData.academicYear}
                    onChange={(e) => handleBasicDataChange("academicYear", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classrooms">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Classroom Management</CardTitle>
                <CardDescription>Add and configure available classrooms</CardDescription>
              </div>
              <Button onClick={addClassroom} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Classroom
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {classrooms.map((classroom) => (
                <div key={classroom.id} className="p-4 border border-border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Classroom {classroom.id}</h4>
                    {classrooms.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeClassroom(classroom.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Room Name/Number</Label>
                      <Input
                        placeholder="e.g., Room 101"
                        value={classroom.name}
                        onChange={(e) => updateClassroom(classroom.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Capacity</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 60"
                        value={classroom.capacity}
                        onChange={(e) => updateClassroom(classroom.id, "capacity", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Room Type</Label>
                      <Select
                        value={classroom.type}
                        onValueChange={(value) => updateClassroom(classroom.id, "type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lecture">Lecture Hall</SelectItem>
                          <SelectItem value="lab">Laboratory</SelectItem>
                          <SelectItem value="seminar">Seminar Room</SelectItem>
                          <SelectItem value="auditorium">Auditorium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Building</Label>
                      <Input
                        placeholder="e.g., Block A"
                        value={classroom.building}
                        onChange={(e) => updateClassroom(classroom.id, "building", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Floor</Label>
                      <Input
                        placeholder="e.g., Ground Floor"
                        value={classroom.floor}
                        onChange={(e) => updateClassroom(classroom.id, "floor", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculty">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Faculty Management</CardTitle>
                <CardDescription>Add faculty members and their teaching preferences</CardDescription>
              </div>
              <Button onClick={addFaculty} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Faculty
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {faculty.map((member) => (
                <div key={member.id} className="p-4 border border-border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Faculty Member {member.id}</h4>
                    {faculty.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeFaculty(member.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Faculty Name</Label>
                      <Input
                        placeholder="e.g., Dr. John Smith"
                        value={member.name}
                        onChange={(e) => updateFaculty(member.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Hours Per Day</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 6"
                        value={member.maxHoursPerDay}
                        onChange={(e) => updateFaculty(member.id, "maxHoursPerDay", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Average Leaves Per Month</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 2"
                        value={member.avgLeavesPerMonth}
                        onChange={(e) => updateFaculty(member.id, "avgLeavesPerMonth", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subjects (comma-separated)</Label>
                      <Textarea
                        placeholder="e.g., Mathematics, Statistics, Calculus"
                        value={Array.isArray(member.subjects) ? member.subjects.join(", ") : member.subjects}
                        onChange={(e) => updateFaculty(member.id, "subjects", e.target.value.split(", "))}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Subject Management</CardTitle>
                <CardDescription>Configure subjects and their requirements</CardDescription>
              </div>
              <Button onClick={addSubject} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject.id} className="p-4 border border-border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Subject {subject.id}</h4>
                    {subjects.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeSubject(subject.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Subject Name</Label>
                      <Input
                        placeholder="e.g., Data Structures"
                        value={subject.name}
                        onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subject Code</Label>
                      <Input
                        placeholder="e.g., CS201"
                        value={subject.code}
                        onChange={(e) => updateSubject(subject.id, "code", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Hours Per Week</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 4"
                        value={subject.hoursPerWeek}
                        onChange={(e) => updateSubject(subject.id, "hoursPerWeek", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subject Type</Label>
                      <Select value={subject.type} onValueChange={(value) => updateSubject(subject.id, "type", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="theory">Theory</SelectItem>
                          <SelectItem value="practical">Practical</SelectItem>
                          <SelectItem value="tutorial">Tutorial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Department</Label>
                      <Input
                        placeholder="e.g., Computer Science"
                        value={subject.department}
                        onChange={(e) => updateSubject(subject.id, "department", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
