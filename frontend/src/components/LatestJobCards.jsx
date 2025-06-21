"use client"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom"
import { MapPin, Clock, DollarSign, Users, Building2 } from "lucide-react"

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate()

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  }

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
            <Building2 className="h-6 w-6 text-blue-600" />
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
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)}d`}
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
      <div className="flex flex-wrap gap-2">
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
    </div>
  )
}

export default LatestJobCards
