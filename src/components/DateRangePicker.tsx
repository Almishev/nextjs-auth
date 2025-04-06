'use client'
import { useState, useEffect } from 'react'
import { DateRange, Range } from 'react-date-range'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import '../app/styles/daterange.css'

interface DateRangePickerProps {
  onChange: (range: Range) => void
  initialDateRange?: Range
}

export default function DateRangePicker({ onChange, initialDateRange }: DateRangePickerProps) {
  const [dateRange, setDateRange] = useState<Range[]>([
    initialDateRange || {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSelect = (ranges: any) => {
    const startDate = new Date(ranges.selection.startDate)
    startDate.setHours(12, 0, 0, 0)
    
    const endDate = new Date(ranges.selection.endDate)
    endDate.setHours(12, 0, 0, 0)

    const correctedRange = {
      startDate,
      endDate,
      key: 'selection'
    }

    setDateRange([correctedRange])
    onChange(correctedRange)
  }

  if (!isMounted) return null

  return (
    <div className="rounded-lg bg-white p-4 shadow-md w-full">
      <DateRange
        ranges={dateRange}
        onChange={handleSelect}
        months={1}
        direction="vertical"
        showDateDisplay={true}
        minDate={new Date()}
        maxDate={addDays(new Date(), 365)}
        rangeColors={['#667eea']}
        color="#667eea"
        dateDisplayFormat="MM/dd/yyyy"
      />
    </div>
  )
} 