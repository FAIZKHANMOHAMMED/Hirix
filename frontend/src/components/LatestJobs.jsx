"use client"
import LatestJobCards from "./LatestJobCards"
import { useSelector } from "react-redux"
import { ArrowRight, Briefcase } from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job)
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-medium text-sm mb-4">
            <Briefcase className="h-4 w-4 mr-2" />
            Latest Opportunities
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Latest & Top
            </span>{" "}
            Job Openings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exciting career opportunities from leading companies across various industries
          </p>
        </div>

        {/* Jobs Grid */}
        {allJobs.length <= 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Jobs Available</h3>
            <p className="text-gray-600 mb-8">Check back later for new opportunities</p>
            <Button
              onClick={() => navigate("/jobs")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Browse All Jobs
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {allJobs?.slice(0, 6).map((job) => (
                <LatestJobCards key={job._id} job={job} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button
                onClick={() => navigate("/jobs")}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                View All Jobs
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default LatestJobs
