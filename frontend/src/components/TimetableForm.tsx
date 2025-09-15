import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Users, 
  BookOpen, 
  Clock, 
  UserCheck, 
  CalendarDays,
  ArrowRight,
  Plus,
  Minus
} from "lucide-react";

interface TimetableFormProps {
  onGenerate: (data: any) => void;
  onBack: () => void;
}

const TimetableForm = ({ onGenerate, onBack }: TimetableFormProps) => {
  const [formData, setFormData] = useState({
    timetableName: "",
    semester: "",
    department: "",
    classrooms: [],
    batches: [],
    subjects: [],
    maxClassesPerDay: 6,
    facultyData: []
  });

  const [subjects, setSubjects] = useState([
    { name: "", classesPerWeek: 3, faculty: "", type: "theory" }
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { name: "", classesPerWeek: 3, faculty: "", type: "theory" }]);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index: number, field: string, value: any) => {
    const updated = subjects.map((subject, i) => 
      i === index ? { ...subject, [field]: value } : subject
    );
    setSubjects(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ ...formData, subjects });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button onClick={onBack} variant="outline" size="sm">
                ← Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Create New Timetable</h1>
                <p className="text-muted-foreground">Input parameters for optimization</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>General details for the timetable</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="timetableName">Timetable Name</Label>
                <Input
                  id="timetableName"
                  placeholder="e.g., CS Semester 5 - 2024"
                  value={formData.timetableName}
                  onChange={(e) => setFormData(prev => ({ ...prev, timetableName: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="mechanical">Mechanical</SelectItem>
                    <SelectItem value="civil">Civil</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, semester: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8].map(sem => (
                      <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Infrastructure Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-primary" />
                  <span>Classrooms Available</span>
                </CardTitle>
                <CardDescription>List of available classrooms and labs</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter classroom names (one per line)&#10;e.g.:&#10;Room 101&#10;Room 102&#10;Computer Lab 1&#10;Physics Lab"
                  rows={6}
                  onChange={(e) => {
                    const rooms = e.target.value.split('\n').filter(room => room.trim());
                    setFormData(prev => ({ ...prev, classrooms: rooms }));
                  }}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Total: {formData.classrooms.length} classrooms
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Student Batches</span>
                </CardTitle>
                <CardDescription>Groups of students for this department</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter batch names (one per line)&#10;e.g.:&#10;CS-A&#10;CS-B&#10;CS-C"
                  rows={6}
                  onChange={(e) => {
                    const batches = e.target.value.split('\n').filter(batch => batch.trim());
                    setFormData(prev => ({ ...prev, batches }));
                  }}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Total: {formData.batches.length} batches
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Subjects & Faculty */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Subjects & Faculty Assignment</span>
              </CardTitle>
              <CardDescription>Configure subjects, classes per week, and faculty assignments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={index} className="p-4 border border-border rounded-lg bg-muted/30">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Subject Name</Label>
                      <Input
                        placeholder="e.g., Data Structures"
                        value={subject.name}
                        onChange={(e) => updateSubject(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Classes per Week</Label>
                      <Select 
                        value={subject.classesPerWeek.toString()}
                        onValueChange={(value) => updateSubject(index, 'classesPerWeek', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Faculty</Label>
                      <Input
                        placeholder="Faculty name"
                        value={subject.faculty}
                        onChange={(e) => updateSubject(index, 'faculty', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <div className="flex items-center space-x-2">
                        <Select 
                          value={subject.type}
                          onValueChange={(value) => updateSubject(index, 'type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="theory">Theory</SelectItem>
                            <SelectItem value="practical">Practical</SelectItem>
                          </SelectContent>
                        </Select>
                        {subjects.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeSubject(index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addSubject}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Subject
              </Button>
            </CardContent>
          </Card>

          {/* Constraints */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Scheduling Constraints</span>
              </CardTitle>
              <CardDescription>Set limits and preferences for optimization</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="maxClasses">Maximum Classes per Day</Label>
                <Select 
                  value={formData.maxClassesPerDay.toString()}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, maxClassesPerDay: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[4,5,6,7,8].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} classes</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Working Days</Label>
                <div className="flex flex-wrap gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <Badge key={day} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" variant="hero">
              <ArrowRight className="h-4 w-4 mr-2" />
              Generate Optimized Timetable
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default TimetableForm;