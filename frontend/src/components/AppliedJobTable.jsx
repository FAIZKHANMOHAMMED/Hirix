import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { useSelector } from "react-redux"
import { Calendar, Building2, Briefcase } from "lucide-react"

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job)

  if (allAppliedJobs.length <= 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Yet</h3>
        <p className="text-gray-600">Start applying to jobs to see your applications here</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption className="text-gray-600 mt-4">A list of your job applications</TableCaption>
        <TableHeader>
          <TableRow className="border-gray-200">
            <TableHead className="font-semibold text-gray-900">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Date Applied</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold text-gray-900">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>Job Role</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold text-gray-900">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Company</span>
              </div>
            </TableHead>
            <TableHead className="text-right font-semibold text-gray-900">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((appliedJob) => (
            <TableRow key={appliedJob._id} className="border-gray-100 hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-gray-700">{appliedJob.job?.title}</TableCell>
              <TableCell className="text-gray-700">{appliedJob.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`${
                    appliedJob?.status === "rejected"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : appliedJob.status === "pending"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : "bg-green-50 text-green-700 border-green-200"
                  } px-3 py-1`}
                >
                  {appliedJob.status.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
