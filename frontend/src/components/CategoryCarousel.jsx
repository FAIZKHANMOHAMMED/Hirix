"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Button } from "./ui/button"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSearchedQuery } from "@/redux/jobSlice"
import { Code, Palette, Database, Layers, Monitor, Smartphone } from "lucide-react"

const categories = [
  { name: "Frontend Developer", icon: Monitor, color: "from-blue-500 to-cyan-500" },
  { name: "Backend Developer", icon: Database, color: "from-green-500 to-emerald-500" },
  { name: "Data Science", icon: Code, color: "from-purple-500 to-violet-500" },
  { name: "Graphic Designer", icon: Palette, color: "from-pink-500 to-rose-500" },
  { name: "FullStack Developer", icon: Layers, color: "from-orange-500 to-red-500" },
  { name: "Mobile Developer", icon: Smartphone, color: "from-indigo-500 to-blue-500" },
]

const CategoryCarousel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Browse by{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find opportunities in your field of expertise</p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Button
                    onClick={() => searchJobHandler(category.name)}
                    variant="outline"
                    className="w-full h-auto p-6 border-2 border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 group bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <span className="font-medium text-gray-900 group-hover:text-gray-700 text-center">
                        {category.name}
                      </span>
                    </div>
                  </Button>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-12 bg-white shadow-lg border-2 hover:bg-gray-50" />
          <CarouselNext className="hidden sm:flex -right-12 bg-white shadow-lg border-2 hover:bg-gray-50" />
        </Carousel>
      </div>
    </section>
  )
}

export default CategoryCarousel
