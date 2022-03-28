import React, { ChangeEvent, useEffect, useState } from 'react'

import { Friend } from '../../pages/Chat'
import { getStatus } from '../chat/Helpers'
import useFriendStatus from '../chat/useFriendStatus'

interface Props {
  friendList: Friend[]
}

const ChatRecipientPicker: React.FC<Props> = props => {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  }, [count])

  const [recipientID, setRecipientID] = useState<string>(props.friendList[0].id)
  const isRecipientOnline = useFriendStatus(recipientID)

  useEffect(() => {
    console.log(
      `Change recipient to ${recipientID}, status: ${isRecipientOnline}`
    )
  }, [isRecipientOnline, recipientID])

  const onRecipientChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCount(prevCount => prevCount + 1)
    setRecipientID(e.target.value)
  }
  return (
    <div>
      <h2>Chat Recipient Status With Counter</h2>
      <select value={recipientID} onChange={onRecipientChange}>
        {props.friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
      {' : '}
      <span style={{ color: isRecipientOnline ? 'green' : 'black' }}>
        {getStatus(isRecipientOnline)}
      </span>
    </div>
  )
}

export default ChatRecipientPicker
