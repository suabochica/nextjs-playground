import { useState, useEffect } from "react"
import { formatDate } from "@/app/lib/useDateTimeFormat";


const isRelativeTuneFormat = typeof Intl !== 'undefined' && Intl.RelativeTimeFormat;

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiffs = (timestamp: number) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > +secondsInUnit || unit === 'second') {
      const value = Math.round(elapsed / +secondsInUnit)

      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp: number) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp)
      setTimeAgo(newTimeAgo)
    }, 5000)

    return () => clearInterval(interval)
  }, [timestamp])

  if (!isRelativeTuneFormat) {
    return formatDate(timestamp)
  }

  const rtf = new Intl.RelativeTimeFormat('es', { style: 'long' })
  const { value, unit } = timeAgo!

  // @ts-expect-error: check how to cast unit to 'number' and not 'string | number'
  return rtf.format(value, unit)
}
