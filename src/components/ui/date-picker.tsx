'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'

interface DatePickerProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  minDate?: Date
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Pick a date',
  className,
  disabled,
  minDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  
  // Safely parse date
  const date = React.useMemo(() => {
    if (!value) return undefined
    try {
      const parsed = new Date(value)
      return isNaN(parsed.getTime()) ? undefined : parsed
    } catch {
      return undefined
    }
  }, [value])

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd')
      onChange(formattedDate)
      setOpen(false)
    } else {
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <Input
          type="text"
          value={date ? format(date, 'MM/dd/yyyy') : ''}
          placeholder={placeholder}
          readOnly
          className={cn('h-12 pr-10', className)}
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
            <CalendarIcon className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Open calendar</span>
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 rounded-[20px]" align="start" side="bottom">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={minDate ? (date) => {
            const minDateOnly = new Date(minDate)
            minDateOnly.setHours(0, 0, 0, 0)
            const compareDate = new Date(date)
            compareDate.setHours(0, 0, 0, 0)
            return compareDate < minDateOnly
          } : undefined}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

