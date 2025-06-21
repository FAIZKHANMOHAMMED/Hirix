"use client"
import { Button } from "./ui/button"
import { Bookmark, MapPin, Clock, DollarSign, Users } from "lucide-react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom"

const Job = ({ job }) => {
  const navigate = useNavigate()

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-12 w-12 ring-2 ring-gray-100">
              <AvatarImage src={job?.company?.logo || "/placeholder.svg"} alt={job?.company?.name} />
            </Avatar>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {job?.company?.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {job?.location || "Remote"}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)}d ago`}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {job?.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{job?.description}</p>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
          <Users className="h-3 w-3 mr-1" />
          {job?.position} Positions
        </Badge>
        <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">{job?.jobType}</Badge>
        <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200">
          <DollarSign className="h-3 w-3 mr-1" />
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
        >
          View Details
        </Button>
        <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          Apply Now
        </Button>
      </div>
    </div>
  )
}

export default Job
