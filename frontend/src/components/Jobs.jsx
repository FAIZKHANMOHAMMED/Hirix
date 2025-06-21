"use client"

import { useEffect, useState } from "react"
import Navbar from "./shared/Navbar"
import FilterCard from "./FilterCard"
import Job from "./Job"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "./ui/button"

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        )
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Job</h1>
              <p className="text-gray-600">
                {filterJobs.length} {filterJobs.length === 1 ? "job" : "jobs"} found
                {searchedQuery && ` for "${searchedQuery}"`}
              </p>
            </div>
            <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="mt-4 sm:mt-0 lg:hidden">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="sticky top-24">
              <FilterCard />
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Jobs Found</h3>
                <p className="text-gray-600 mb-8">
                  Try adjusting your search criteria or browse all available positions
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Browse All Jobs
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
