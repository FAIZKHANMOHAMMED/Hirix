"use client"

import { useEffect, useState } from "react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"
import { MapPin, Briefcase, DollarSign, X } from "lucide-react"
import { Button } from "./ui/button"

const filterData = [
  {
    filterType: "Location",
    icon: MapPin,
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Remote"],
  },
  {
    filterType: "Industry",
    icon: Briefcase,
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science", "Mobile Developer"],
  },
  {
    filterType: "Salary",
    icon: DollarSign,
    array: ["0-5 LPA", "5-10 LPA", "10-15 LPA", "15+ LPA"],
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("")
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  const clearFilters = () => {
    setSelectedValue("")
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        {selectedValue && (
          <Button onClick={clearFilters} variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
        {filterData.map((data, index) => {
          const IconComponent = data.icon
          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                <IconComponent className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">{data.filterType}</h3>
              </div>
              <div className="space-y-2">
                {data.array.map((item, idx) => {
                  const itemId = `filter-${index}-${idx}`
                  return (
                    <div
                      key={itemId}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <RadioGroupItem value={item} id={itemId} className="text-blue-600 focus:ring-blue-500" />
                      <Label htmlFor={itemId} className="flex-1 text-sm text-gray-700 cursor-pointer font-medium">
                        {item}
                      </Label>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default FilterCard
