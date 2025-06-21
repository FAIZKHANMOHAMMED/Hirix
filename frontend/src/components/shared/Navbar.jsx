"use client"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import { LogOut, User2, Menu, X, Briefcase } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constant"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"
import { useState } from "react"

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            JobPortal
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-6">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                  >
                    Companies
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                  >
                    Jobs
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                  >
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                  >
                    Jobs
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                  >
                    Browse
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Section */}
          {!user ? (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200">
                  <Avatar className="h-10 w-10 ring-2 ring-blue-100 hover:ring-blue-200 transition-all duration-200">
                    <AvatarImage src={user?.profile?.profilePhoto || "/placeholder.svg"} alt="Profile" />
                  </Avatar>
                  <div className="hidden lg:block">
                    <p className="font-medium text-gray-900">{user?.fullname}</p>
                    <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 shadow-xl border-0 bg-white rounded-xl">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user?.profile?.profilePhoto || "/placeholder.svg"} alt="Profile" />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                      <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {user && user.role === "student" && (
                      <Link to="/profile">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        >
                          <User2 className="h-4 w-4 mr-3" />
                          View Profile
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={logoutHandler}
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-gray-700">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {user && user.role === "recruiter" ? (
              <>
                <Link
                  to="/admin/companies"
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Companies
                </Link>
                <Link
                  to="/admin/jobs"
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Jobs
                </Link>
                <Link
                  to="/browse"
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Browse
                </Link>
              </>
            )}

            {!user ? (
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Sign Up</Button>
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-100 space-y-3">
                {user && user.role === "student" && (
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User2 className="h-4 w-4 mr-3" />
                      View Profile
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={() => {
                    logoutHandler()
                    setIsMobileMenuOpen(false)
                  }}
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
