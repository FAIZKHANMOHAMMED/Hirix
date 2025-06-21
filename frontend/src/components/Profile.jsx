"use client"

import { useState } from "react"
import Navbar from "./shared/Navbar"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Contact, Mail, Pen, FileText, Award, MapPin } from "lucide-react"
import { Badge } from "./ui/badge"
import AppliedJobTable from "./AppliedJobTable"
import UpdateProfileDialog from "./UpdateProfileDialog"
import { useSelector } from "react-redux"
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs"

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false)
  const { user } = useSelector((store) => store.auth)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-blue-100">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  }
                  alt="profile"
                />
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">{user?.fullname}</h1>
                <p className="text-lg text-gray-600">{user?.profile?.bio || "No bio available"}</p>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Location not specified</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Pen className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Contact Information */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">{user?.email}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Contact className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">{user?.phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length !== 0 ? (
                user?.profile?.skills.map((skill, index) => (
                  <Badge key={index} className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 px-3 py-1">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500 italic">No skills added yet</span>
              )}
            </div>
          </div>

          {/* Resume Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">Resume</h2>
            </div>
            {user?.profile?.resume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                rel="noreferrer"
              >
                <FileText className="h-4 w-4 mr-2" />
                {user?.profile?.resumeOriginalName || "View Resume"}
              </a>
            ) : (
              <span className="text-gray-500 italic">No resume uploaded</span>
            )}
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
