'use client'
import { useEffect, useState } from 'react'

/** Live Los Angeles local time, e.g. "14:32:07 PT" */
export default function LocalTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      setTime(new Intl.DateTimeFormat('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: 'America/Los_Angeles',
      }).format(new Date()))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span suppressHydrationWarning>{time ? `${time} PT` : '—'}</span>
}
