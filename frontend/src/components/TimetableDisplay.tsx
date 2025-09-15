import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Eye,
  ThumbsUp
} from "lucide-react";

interface TimetableDisplayProps {
  timetableData: any;
  onBack: () => void;
  onApprove: (timetableId: number) => void;
}

const TimetableDisplay = ({ timetableData, onBack, onApprove }: TimetableDisplayProps) => {
  const [selectedOption, setSelectedOption] = useState(0);
  
  // Mock generated timetables (3 optimized options)
  const timetableOptions = [
    {
      id: 1,
      name: "Option A - Balanced Distribution",
      score: 95,
      conflicts: 0,
      utilization: 92,
      description: "Even distribution of classes across days with optimal room utilization"
    },
    {
      id: 2, 
      name: "Option B - Faculty Optimized",
      score: 88,
      conflicts: 1,
      utilization: 89,
      description: "Minimized faculty travel time with consolidated teaching blocks"
    },
    {
      id: 3,
      name: "Option C - Student Friendly",
      score: 85,
      conflicts: 0,
      utilization: 85,
      description: "Reduced gaps between classes for better student experience"
    }
  ];

  // Mock timetable data
  const sampleTimetable = {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-01:00', '02:00-03:00', '03:00-04:00'],
    schedule: {
      'Monday': {
        '09:00-10:00': { subject: 'Data Structures', faculty: 'Dr. Smith', room: 'Room 101', batch: 'CS-A' },
        '10:00-11:00': { subject: 'Algorithm Design', faculty: 'Prof. Johnson', room: 'Room 102', batch: 'CS-B' },
        '11:00-12:00': { subject: 'Database Systems', faculty: 'Dr. Brown', room: 'Room 103', batch: 'CS-A' },
        '02:00-03:00': { subject: 'Software Engineering', faculty: 'Prof. Davis', room: 'Room 101', batch: 'CS-A' },
        '03:00-04:00': { subject: 'Computer Networks', faculty: 'Dr. Wilson', room: 'Lab 1', batch: 'CS-B' },
      },
      'Tuesday': {
        '09:00-10:00': { subject: 'Machine Learning', faculty: 'Dr. Garcia', room: 'Room 201', batch: 'CS-A' },
        '10:00-11:00': { subject: 'Data Structures', faculty: 'Dr. Smith', room: 'Room 101', batch: 'CS-B' },
        '11:00-12:00': { subject: 'Operating Systems', faculty: 'Prof. Taylor', room: 'Room 102', batch: 'CS-A' },
        '02:00-03:00': { subject: 'Web Development', faculty: 'Dr. Martinez', room: 'Lab 2', batch: 'CS-B' },
      },
      // Add more days...
    }
  };

  const currentOption = timetableOptions[selectedOption];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button onClick={onBack} variant="outline" size="sm">
                ← Back to Form
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Generated Timetables</h1>
                <p className="text-muted-foreground">Review and select the best option</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={() => onApprove(currentOption.id)} variant="success">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Approve & Implement
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Timetable Options */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-primary" />
              <span>Optimization Results</span>
            </CardTitle>
            <CardDescription>3 optimized timetable options generated based on your parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {timetableOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedOption === index 
                      ? 'border-primary bg-primary/5 shadow-elevated' 
                      : 'border-border hover:border-primary/50 hover:bg-accent/30'
                  }`}
                  onClick={() => setSelectedOption(index)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{option.name}</h3>
                    <Badge className="bg-success text-success-foreground">
                      Score: {option.score}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Conflicts:</span>
                      <span className={option.conflicts === 0 ? 'text-success font-medium' : 'text-warning font-medium'}>
                        {option.conflicts}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Room Utilization:</span>
                      <span className="font-medium">{option.utilization}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Timetable Details */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Summary Stats */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Conflicts</span>
                </div>
                <Badge variant={currentOption.conflicts === 0 ? 'default' : 'destructive'} className="bg-success text-success-foreground">
                  {currentOption.conflicts}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">Utilization</span>
                </div>
                <span className="font-medium">{currentOption.utilization}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">Working Days</span>
                </div>
                <span className="font-medium">5 days</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">Daily Classes</span>
                </div>
                <span className="font-medium">6 hrs</span>
              </div>
            </CardContent>
          </Card>

          {/* Timetable Grid */}
          <div className="lg:col-span-3">
            <Card className="card-elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{currentOption.name}</CardTitle>
                  <Select defaultValue="CS-A">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CS-A">Batch CS-A</SelectItem>
                      <SelectItem value="CS-B">Batch CS-B</SelectItem>
                      <SelectItem value="CS-C">Batch CS-C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Timetable Header */}
                  <div className="grid grid-cols-6 gap-1 mb-2">
                    <div className="timetable-header p-3 text-center font-semibold">
                      Time / Day
                    </div>
                    {sampleTimetable.days.map(day => (
                      <div key={day} className="timetable-header p-3 text-center font-semibold">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Timetable Body */}
                  {sampleTimetable.timeSlots.map(timeSlot => (
                    <div key={timeSlot} className="grid grid-cols-6 gap-1 mb-1">
                      <div className="timetable-cell font-medium text-center bg-muted">
                        {timeSlot}
                      </div>
                      {sampleTimetable.days.map(day => {
                        const classData = sampleTimetable.schedule[day]?.[timeSlot];
                        return (
                          <div key={`${day}-${timeSlot}`} className="timetable-cell">
                            {classData ? (
                              <div className="space-y-1">
                                <div className="font-semibold text-sm text-primary">
                                  {classData.subject}
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  {classData.faculty}
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {classData.room}
                                </div>
                              </div>
                            ) : (
                              <div className="text-xs text-muted-foreground text-center py-4">
                                -
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TimetableDisplay;