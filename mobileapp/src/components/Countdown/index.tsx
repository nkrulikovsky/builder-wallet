import { useEffect, useState } from 'react'
import { Text } from 'react-native'

type CountdownProps = {
  timestamp: number
  style: string
  endText: string
}

/*
 * Countdown component that takes a timestamp and displays the time remaining
 * [timestamp] should be in milliseconds
 */
const Countdown = ({ timestamp, style, endText }: CountdownProps) => {
  if (isNaN(timestamp)) return <Text className={style}>-</Text>
  if (timestamp < Date.now()) return <Text className={style}>{endText}</Text>

  const [timeRemaining, setTimeRemaining] = useState<number>(
    timestamp - Date.now()
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(timestamp - Date.now())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [timestamp])

  const formatTime = (time: number) => {
    const seconds = Math.floor((time / 1000) % 60)
    const minutes = Math.floor((time / (1000 * 60)) % 60)
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24)

    return `${hours}h ${minutes}m ${seconds}s`
  }

  return <Text className={style}>{formatTime(timeRemaining)}</Text>
}

export default Countdown
