'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'

interface DateTimePickerProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  minDateTime?: string
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = 'Pick a date and time',
  className,
  disabled,
  minDateTime,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false)
  
  // Safely parse initial values
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(() => {
    if (!value) return undefined
    try {
      const date = new Date(value)
      return isNaN(date.getTime()) ? undefined : date
    } catch {
      return undefined
    }
  })
  
  const [timeValue, setTimeValue] = React.useState<string>(() => {
    if (!value) return ''
    try {
      const date = new Date(value)
      return isNaN(date.getTime()) ? '' : format(date, 'HH:mm')
    } catch {
      return ''
    }
  })

  React.useEffect(() => {
    if (value) {
      try {
        const date = new Date(value)
        if (!isNaN(date.getTime())) {
          setSelectedDate(date)
          setTimeValue(format(date, 'HH:mm'))
        }
      } catch {
        // Invalid date, do nothing
      }
    } else {
      setSelectedDate(undefined)
      setTimeValue('')
    }
  }, [value])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date && timeValue) {
      const [hours, minutes] = timeValue.split(':')
      const newDateTime = new Date(date)
      newDateTime.setHours(parseInt(hours, 10))
      newDateTime.setMinutes(parseInt(minutes, 10))
      const formatted = format(newDateTime, "yyyy-MM-dd'T'HH:mm")
      onChange(formatted)
    }
  }

  const handleTimeChange = (time: string) => {
    setTimeValue(time)
    if (selectedDate && time) {
      const [hours, minutes] = time.split(':')
      const newDateTime = new Date(selectedDate)
      newDateTime.setHours(parseInt(hours, 10))
      newDateTime.setMinutes(parseInt(minutes, 10))
      const formatted = format(newDateTime, "yyyy-MM-dd'T'HH:mm")
      onChange(formatted)
    }
  }

  const handleComplete = () => {
    if (selectedDate && timeValue) {
      setOpen(false)
    }
  }

  const displayValue = React.useMemo(() => {
    if (!value) return ''
    try {
      const date = new Date(value)
      return isNaN(date.getTime()) ? '' : format(date, 'MM/dd/yyyy, HH:mm')
    } catch {
      return ''
    }
  }, [value])

  const minDate = React.useMemo(() => {
    if (!minDateTime) return undefined
    try {
      const date = new Date(minDateTime)
      return isNaN(date.getTime()) ? undefined : date
    } catch {
      return undefined
    }
  }, [minDateTime])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <Input
          type="text"
          value={displayValue}
          placeholder={placeholder}
          readOnly
          className={cn('h-12 pr-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 hover:border-[#2D2DDD] focus-visible:border-white dark:focus-visible:border-white focus-visible:outline-none focus-visible:ring-0 border-focus-thin', className)}
          disabled={disabled}
        />
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              'absolute right-0 top-0 h-12 w-10 hover:bg-transparent',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            disabled={disabled}
          >
            <CalendarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Open calendar</span>
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 rounded-[20px] overflow-hidden" align="start" side="bottom">
        <div className="p-4 pb-4">
          <div className="mb-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={minDate ? (date) => {
                const minDateOnly = new Date(minDate)
                minDateOnly.setHours(0, 0, 0, 0)
                const compareDate = new Date(date)
                compareDate.setHours(0, 0, 0, 0)
                return compareDate < minDateOnly
              } : undefined}
              initialFocus
            />
          </div>
          <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-4 mt-4 rounded-[5px] bg-gray-50 dark:bg-gray-900/50 p-3">
            <label className="text-sm font-semibold mb-3 block text-gray-900 dark:text-gray-100">
              Select Time
            </label>
            <div className="space-y-3">
              <Input
                type="time"
                value={timeValue}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 h-12 border-2 border-gray-300 dark:border-gray-600 rounded-[5px] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Select time (HH:mm)"
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={handleComplete}
                  className="flex-1 rounded-[5px] bg-[#2D2DDD] hover:bg-[#2D2DDD]/90 text-white"
                  size="sm"
                  disabled={!selectedDate || !timeValue}
                >
                  Confirm
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-[5px] border-white text-white hover:bg-[#2D2DDD] hover:border-[#2D2DDD] hover:text-white"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

