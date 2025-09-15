"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, RefreshCw, Download, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function TimetableGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTimetables, setGeneratedTimetables] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedBatch, setSelectedBatch] = useState("")
  const [inputData, setInputData] = useState(null)
  const [conflicts, setConflicts] = useState([])

  useEffect(() => {
    // Load saved data
    const savedData = localStorage.getItem("schedulerData")
    if (savedData) {
      setInputData(JSON.parse(savedData))
    }
  }, [])

  const generateTimetable = async () => {
    setIsGenerating(true)
    setConflicts([])

    // Simulate timetable generation process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate sample timetables
    const sampleTimetables = [
      {
        id: 1,
        name: "Optimized Schedule A",
        efficiency: 92,
        conflicts: 2,
        utilization: 88,
        schedule: generateSampleSchedule("A"),
      },
      {
        id: 2,
        name: "Balanced Schedule B",
        efficiency: 87,
        conflicts: 1,
        utilization: 85,
        schedule: generateSampleSchedule("B"),
      },
      {
        id: 3,
        name: "Faculty-Friendly Schedule C",
        efficiency: 84,
        conflicts: 0,
        utilization: 82,
        schedule: generateSampleSchedule("C"),
      },
    ]

    // Generate sample conflicts
    const sampleConflicts = [
      {
        type: "Room Conflict",
        description: "Room 101 is double-booked on Monday 10:00 AM",
        severity: "high",
        suggestions: ["Use Room 102", "Reschedule to 11:00 AM"],
      },
      {
        type: "Faculty Overload",
        description: "Dr. Smith has 7 hours on Tuesday (exceeds limit of 6)",
        severity: "medium",
        suggestions: ["Redistribute one class to Wednesday", "Assign to Dr. Johnson"],
      },
    ]

    setGeneratedTimetables(sampleTimetables)
    setConflicts(sampleConflicts)
    setIsGenerating(false)
  }

  const generateSampleSchedule = (variant) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    const timeSlots = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", "2:00-3:00", "3:00-4:00"]
    const subjects = ["Mathematics", "Physics", "Chemistry", "Computer Science", "English", "History"]
    const rooms = ["Room 101", "Room 102", "Lab A", "Lab B", "Auditorium"]
    const faculty = ["Dr. Smith", "Prof. Johnson", "Dr. Brown", "Prof. Davis", "Dr. Wilson"]

    const schedule = {}
    days.forEach((day) => {
      schedule[day] = {}
      timeSlots.forEach((slot) => {
        if (slot === "12:00-1:00") {
          schedule[day][slot] = { subject: "LUNCH BREAK", room: "-", faculty: "-", type: "break" }
        } else {
          const randomSubject = subjects[Math.floor(Math.random() * subjects.length)]
          const randomRoom = rooms[Math.floor(Math.random() * rooms.length)]
          const randomFaculty = faculty[Math.floor(Math.random() * faculty.length)]
          schedule[day][slot] = {
            subject: randomSubject,
            room: randomRoom,
            faculty: randomFaculty,
            type: "class",
          }
        }
      })
    })

    return schedule
  }

  const downloadTimetable = (timetable) => {
    const dataStr = JSON.stringify(timetable, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `timetable-${timetable.name.replace(/\s+/g, "-").toLowerCase()}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Timetable Generator</h1>
          <p className="text-muted-foreground">Generate optimized timetables based on your input data</p>
        </div>
      </div>

      {/* Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Generation Parameters</CardTitle>
          <CardDescription>Configure parameters for timetable generation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Batch/Year</label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger>
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st-year">1st Year</SelectItem>
                  <SelectItem value="2nd-year">2nd Year</SelectItem>
                  <SelectItem value="3rd-year">3rd Year</SelectItem>
                  <SelectItem value="4th-year">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={generateTimetable} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Generate Timetables
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Status */}
      {inputData && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Input data loaded successfully. Ready to generate timetables with {inputData.classrooms?.length || 0}{" "}
            classrooms, {inputData.faculty?.length || 0} faculty members, and {inputData.subjects?.length || 0}{" "}
            subjects.
          </AlertDescription>
        </Alert>
      )}

      {/* Conflicts */}
      {conflicts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Scheduling Conflicts
            </CardTitle>
            <CardDescription>Issues detected during timetable generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {conflicts.map((conflict, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{conflict.type}</h4>
                  <Badge variant={conflict.severity === "high" ? "destructive" : "secondary"}>
                    {conflict.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{conflict.description}</p>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Suggestions:</p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                    {conflict.suggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Generated Timetables */}
      {generatedTimetables.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Generated Timetables</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {generatedTimetables.map((timetable) => (
              <Card key={timetable.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {timetable.name}
                    <Badge variant="outline">{timetable.efficiency}% efficient</Badge>
                  </CardTitle>
                  <CardDescription>
                    {timetable.conflicts} conflicts • {timetable.utilization}% room utilization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Efficiency:</span>
                      <span className="font-medium">{timetable.efficiency}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Conflicts:</span>
                      <span className={`font-medium ${timetable.conflicts === 0 ? "text-green-600" : "text-red-600"}`}>
                        {timetable.conflicts}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Room Utilization:</span>
                      <span className="font-medium">{timetable.utilization}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Clock className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => downloadTimetable(timetable)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Timetable View */}
          {generatedTimetables.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Timetable Preview - {generatedTimetables[0].name}</CardTitle>
                <CardDescription>Detailed view of the generated schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="table" className="w-full">
                  <TabsList>
                    <TabsTrigger value="table">Table View</TabsTrigger>
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                  </TabsList>
                  <TabsContent value="table" className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-border">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border border-border p-2 text-left">Time</th>
                            <th className="border border-border p-2 text-left">Monday</th>
                            <th className="border border-border p-2 text-left">Tuesday</th>
                            <th className="border border-border p-2 text-left">Wednesday</th>
                            <th className="border border-border p-2 text-left">Thursday</th>
                            <th className="border border-border p-2 text-left">Friday</th>
                          </tr>
                        </thead>
                        <tbody>
                          {["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", "2:00-3:00", "3:00-4:00"].map(
                            (timeSlot) => (
                              <tr key={timeSlot}>
                                <td className="border border-border p-2 font-medium bg-muted/50">{timeSlot}</td>
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
                                  const classInfo = generatedTimetables[0].schedule[day][timeSlot]
                                  return (
                                    <td key={day} className="border border-border p-2">
                                      {classInfo.type === "break" ? (
                                        <div className="text-center text-muted-foreground font-medium">
                                          {classInfo.subject}
                                        </div>
                                      ) : (
                                        <div className="space-y-1">
                                          <div className="font-medium text-sm">{classInfo.subject}</div>
                                          <div className="text-xs text-muted-foreground">{classInfo.room}</div>
                                          <div className="text-xs text-muted-foreground">{classInfo.faculty}</div>
                                        </div>
                                      )}
                                    </td>
                                  )
                                })}
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  <TabsContent value="grid" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                        <Card key={day}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{day}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", "2:00-3:00", "3:00-4:00"].map(
                              (timeSlot) => {
                                const classInfo = generatedTimetables[0].schedule[day][timeSlot]
                                return (
                                  <div
                                    key={timeSlot}
                                    className={`p-2 rounded text-xs ${
                                      classInfo.type === "break"
                                        ? "bg-muted text-muted-foreground"
                                        : "bg-accent/10 border border-accent/20"
                                    }`}
                                  >
                                    <div className="font-medium">{timeSlot}</div>
                                    <div className="mt-1">{classInfo.subject}</div>
                                    {classInfo.type !== "break" && (
                                      <>
                                        <div className="text-muted-foreground">{classInfo.room}</div>
                                        <div className="text-muted-foreground">{classInfo.faculty}</div>
                                      </>
                                    )}
                                  </div>
                                )
                              },
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
