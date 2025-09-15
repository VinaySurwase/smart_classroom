import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Building, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  FileText,
  Settings
} from "lucide-react";

interface DashboardProps {
  onCreateTimetable: () => void;
  onViewTimetables: () => void;
}

const Dashboard = ({ onCreateTimetable, onViewTimetables }: DashboardProps) => {
  const [stats] = useState({
    totalClassrooms: 24,
    totalBatches: 18,
    totalSubjects: 45,
    activeTimetables: 3,
    pendingApprovals: 2
  });

  const recentTimetables = [
    { id: 1, name: "Computer Science - Semester 5", status: "approved", date: "2024-01-15" },
    { id: 2, name: "Electronics - Semester 3", status: "pending", date: "2024-01-14" },
    { id: 3, name: "Mechanical - Semester 7", status: "draft", date: "2024-01-12" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Smart Classroom Dashboard</h1>
                <p className="text-muted-foreground">Timetable Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button onClick={onCreateTimetable} variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Create Timetable
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="card-elevated hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary-light rounded-full">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalClassrooms}</p>
                  <p className="text-sm text-muted-foreground">Classrooms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-success-light rounded-full">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalBatches}</p>
                  <p className="text-sm text-muted-foreground">Student Batches</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-warning-light rounded-full">
                  <BookOpen className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalSubjects}</p>
                  <p className="text-sm text-muted-foreground">Subjects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary-light rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.activeTimetables}</p>
                  <p className="text-sm text-muted-foreground">Active Timetables</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-warning-light rounded-full">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-primary" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>Frequently used operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={onCreateTimetable} className="w-full justify-start" variant="hero">
                <Calendar className="h-4 w-4 mr-2" />
                Create New Timetable
              </Button>
              <Button onClick={onViewTimetables} variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                View All Timetables
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage Faculty
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Building className="h-4 w-4 mr-2" />
                Manage Classrooms
              </Button>
            </CardContent>
          </Card>

          {/* Recent Timetables */}
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Timetables</CardTitle>
                    <CardDescription>Latest timetable activities</CardDescription>
                  </div>
                  <Button onClick={onViewTimetables} variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTimetables.map((timetable) => (
                    <div key={timetable.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/30 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{timetable.name}</p>
                          <p className="text-sm text-muted-foreground">Created on {timetable.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={timetable.status === 'approved' ? 'default' : 
                                  timetable.status === 'pending' ? 'secondary' : 'outline'}
                          className={
                            timetable.status === 'approved' ? 'bg-success text-success-foreground' :
                            timetable.status === 'pending' ? 'bg-warning text-warning-foreground' : ''
                          }
                        >
                          {timetable.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {timetable.status === 'pending' && <AlertCircle className="h-3 w-3 mr-1" />}
                          {timetable.status === 'draft' && <Clock className="h-3 w-3 mr-1" />}
                          {timetable.status.charAt(0).toUpperCase() + timetable.status.slice(1)}
                        </Badge>
                      </div>
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

export default Dashboard;