"use client"

import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant"
import { setSingleJob } from "@/redux/jobSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import Navbar from "./shared/Navbar"
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Building2, Calendar, CheckCircle } from "lucide-react"

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.auth)
  const isInitiallyApplied =
    singleJob?.applications?.some((application) => application.applicant === user?._id) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const applyJobHandler = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem("token"); // or from Redux/AuthContext

const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some((application) => application.applicant === user?._id))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  if (!singleJob) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mx-auto mb-4"></div>
            <p className="text-gray-500">Loading job details...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button onClick={() => navigate(-1)} variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        {/* Job Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{singleJob?.title}</h1>
                  <p className="text-lg text-gray-600">{singleJob?.company?.name}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 px-3 py-1">
                  <Users className="h-4 w-4 mr-1" />
                  {singleJob?.position} Positions
                </Badge>
                <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200 px-3 py-1">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 px-3 py-1">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {singleJob?.salary} LPA
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{singleJob?.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>Posted {singleJob?.createdAt.split("T")[0]}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{singleJob?.applications?.length} Applicants</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{singleJob?.experience} years experience</span>
                </div>
              </div>
            </div>

            <div className="lg:w-64 flex-shrink-0">
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied || isLoading}
                className={`w-full h-12 font-medium rounded-xl transition-all duration-200 ${
                  isApplied
                    ? "bg-green-100 text-green-700 cursor-not-allowed hover:bg-green-100"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isApplied ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Applied Successfully
                  </>
                ) : isLoading ? (
                  "Applying..."
                ) : (
                  "Apply Now"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Job Description</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Role</h3>
              <p className="text-gray-700">{singleJob?.title}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-700">{singleJob?.location}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{singleJob?.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Experience Required</h3>
              <p className="text-gray-700">{singleJob?.experience} years</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Salary</h3>
              <p className="text-gray-700">{singleJob?.salary} LPA</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Total Applicants</h3>
              <p className="text-gray-700">{singleJob?.applications?.length} candidates have applied</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Posted Date</h3>
              <p className="text-gray-700">{singleJob?.createdAt.split("T")[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDescription
