"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle, Clock, Eye, MessageSquare, User, Calendar, AlertTriangle } from "lucide-react"

export default function ReviewApprovalSystem() {
  const [selectedTimetable, setSelectedTimetable] = useState(null)
  const [comment, setComment] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  // Sample timetables for review
  const [timetables, setTimetables] = useState([
    {
      id: 1,
      name: "Computer Science - Semester 3",
      department: "Computer Science",
      batch: "3rd Year",
      createdBy: "Dr. Johnson",
      createdAt: "2024-01-15",
      status: "pending",
      efficiency: 92,
      conflicts: 1,
      comments: [
        {
          author: "Dr. Smith",
          message: "Overall looks good, but there's a conflict on Tuesday 10 AM",
          timestamp: "2024-01-16 09:30",
        },
      ],
    },
    {
      id: 2,
      name: "Mathematics - Semester 2",
      department: "Mathematics",
      batch: "2nd Year",
      createdBy: "Prof. Davis",
      createdAt: "2024-01-14",
      status: "approved",
      efficiency: 88,
      conflicts: 0,
      comments: [
        {
          author: "Dean Office",
          message: "Approved for implementation",
          timestamp: "2024-01-15 14:20",
        },
      ],
    },
    {
      id: 3,
      name: "Physics - Semester 1",
      department: "Physics",
      batch: "1st Year",
      createdBy: "Dr. Wilson",
      createdAt: "2024-01-13",
      status: "rejected",
      efficiency: 75,
      conflicts: 3,
      comments: [
        {
          author: "Academic Committee",
          message: "Too many conflicts detected. Please revise and resubmit.",
          timestamp: "2024-01-14 11:45",
        },
      ],
    },
    {
      id: 4,
      name: "Chemistry - Semester 4",
      department: "Chemistry",
      batch: "4th Year",
      createdBy: "Prof. Brown",
      createdAt: "2024-01-16",
      status: "under_review",
      efficiency: 90,
      conflicts: 0,
      comments: [],
    },
  ])

  const handleApprove = (timetableId) => {
    setTimetables((prev) =>
      prev.map((t) =>
        t.id === timetableId
          ? {
              ...t,
              status: "approved",
              comments: [
                ...t.comments,
                {
                  author: "Current User",
                  message: comment || "Approved for implementation",
                  timestamp: new Date().toLocaleString(),
                },
              ],
            }
          : t,
      ),
    )
    setComment("")
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleReject = (timetableId) => {
    if (!comment.trim()) {
      alert("Please provide a reason for rejection")
      return
    }

    setTimetables((prev) =>
      prev.map((t) =>
        t.id === timetableId
          ? {
              ...t,
              status: "rejected",
              comments: [
                ...t.comments,
                {
                  author: "Current User",
                  message: comment,
                  timestamp: new Date().toLocaleString(),
                },
              ],
            }
          : t,
      ),
    )
    setComment("")
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const addComment = (timetableId) => {
    if (!comment.trim()) return

    setTimetables((prev) =>
      prev.map((t) =>
        t.id === timetableId
          ? {
              ...t,
              status: t.status === "pending" ? "under_review" : t.status,
              comments: [
                ...t.comments,
                {
                  author: "Current User",
                  message: comment,
                  timestamp: new Date().toLocaleString(),
                },
              ],
            }
          : t,
      ),
    )
    setComment("")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "under_review":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "under_review":
        return <Eye className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const pendingCount = timetables.filter((t) => t.status === "pending").length
  const underReviewCount = timetables.filter((t) => t.status === "under_review").length
  const approvedCount = timetables.filter((t) => t.status === "approved").length
  const rejectedCount = timetables.filter((t) => t.status === "rejected").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Review & Approval</h1>
          <p className="text-muted-foreground">Review and approve generated timetables</p>
        </div>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">Action completed successfully!</AlertDescription>
        </Alert>
      )}

      {/* Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{underReviewCount}</div>
            <p className="text-xs text-muted-foreground">Being reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Ready to implement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">Need revision</p>
          </CardContent>
        </Card>
      </div>

      {/* Timetables List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Timetables</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="under_review">Under Review ({underReviewCount})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {timetables.map((timetable) => (
            <TimetableCard
              key={timetable.id}
              timetable={timetable}
              onApprove={handleApprove}
              onReject={handleReject}
              onAddComment={addComment}
              comment={comment}
              setComment={setComment}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {timetables
            .filter((t) => t.status === "pending")
            .map((timetable) => (
              <TimetableCard
                key={timetable.id}
                timetable={timetable}
                onApprove={handleApprove}
                onReject={handleReject}
                onAddComment={addComment}
                comment={comment}
                setComment={setComment}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            ))}
        </TabsContent>

        <TabsContent value="under_review" className="space-y-4">
          {timetables
            .filter((t) => t.status === "under_review")
            .map((timetable) => (
              <TimetableCard
                key={timetable.id}
                timetable={timetable}
                onApprove={handleApprove}
                onReject={handleReject}
                onAddComment={addComment}
                comment={comment}
                setComment={setComment}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {timetables
            .filter((t) => t.status === "approved")
            .map((timetable) => (
              <TimetableCard
                key={timetable.id}
                timetable={timetable}
                onApprove={handleApprove}
                onReject={handleReject}
                onAddComment={addComment}
                comment={comment}
                setComment={setComment}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {timetables
            .filter((t) => t.status === "rejected")
            .map((timetable) => (
              <TimetableCard
                key={timetable.id}
                timetable={timetable}
                onApprove={handleApprove}
                onReject={handleReject}
                onAddComment={addComment}
                comment={comment}
                setComment={setComment}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TimetableCard({
  timetable,
  onApprove,
  onReject,
  onAddComment,
  comment,
  setComment,
  getStatusColor,
  getStatusIcon,
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {timetable.name}
              <Badge className={getStatusColor(timetable.status)}>
                {getStatusIcon(timetable.status)}
                <span className="ml-1 capitalize">{timetable.status.replace("_", " ")}</span>
              </Badge>
            </CardTitle>
            <CardDescription>
              {timetable.department} • {timetable.batch} • Created by {timetable.createdBy} on {timetable.createdAt}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{timetable.efficiency}%</div>
            <div className="text-sm text-muted-foreground">Efficiency</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${timetable.conflicts === 0 ? "text-green-600" : "text-red-600"}`}>
              {timetable.conflicts}
            </div>
            <div className="text-sm text-muted-foreground">Conflicts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{timetable.comments.length}</div>
            <div className="text-sm text-muted-foreground">Comments</div>
          </div>
        </div>

        {/* Conflicts Warning */}
        {timetable.conflicts > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This timetable has {timetable.conflicts} conflict{timetable.conflicts > 1 ? "s" : ""} that need to be
              resolved.
            </AlertDescription>
          </Alert>
        )}

        {/* Comments Section */}
        {timetable.comments.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Comments
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {timetable.comments.map((comment, index) => (
                <div key={index} className="p-2 bg-muted rounded text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-3 w-3" />
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-muted-foreground text-xs">{comment.timestamp}</span>
                  </div>
                  <p>{comment.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Section */}
        <div className="space-y-3 pt-3 border-t border-border">
          <Textarea
            placeholder="Add a comment or feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex gap-2">
            {timetable.status === "pending" || timetable.status === "under_review" ? (
              <>
                <Button onClick={() => onApprove(timetable.id)} className="flex-1" disabled={!comment.trim()}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onReject(timetable.id)}
                  className="flex-1"
                  disabled={!comment.trim()}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => onAddComment(timetable.id)} disabled={!comment.trim()}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Add Comment
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Timetable Preview - {timetable.name}</DialogTitle>
                  <DialogDescription>Detailed view of the timetable schedule</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    This is a preview of the generated timetable. The actual implementation would show the complete
                    schedule with all classes, rooms, and faculty assignments.
                  </div>
                  <div className="bg-muted p-4 rounded text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Timetable preview would be displayed here</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
