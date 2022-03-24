import { useEffect, useState } from 'react'
import ChatAPI from './ChatAPI'

export type Status = boolean | null

function useFriendStatus(friendID: string) {
  const [isOnline, setIsOnline] = useState<Status>(null)

  useEffect(() => {
    const handleStatusChange = (status: Status) => {
      setIsOnline(status)
    }
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
    return () => ChatAPI.unsubscribeToFriendStatus(friendID, handleStatusChange)
  }, [friendID])

  return isOnline
}

export default useFriendStatus
