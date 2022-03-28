import React from 'react'

import FriendList from '../components/chat/FriendList'
import ChatRecipientPicker from '../components/chat/ChatRecipientPicker'

export type Friend = {
  id: string
  name: string
}

export const friendList: Friend[] = [
  { id: '1', name: 'Phoebe' },
  { id: '2', name: 'Rachel' },
  { id: '3', name: 'Ross' },
]

const Chat: React.FC = () => {
  return (
    <div>
      <h1>Using Hooks: Chat</h1>
      <ul>
        <li>Using State Hook</li>
        <li>Using Effect Hook Without Cleanup</li>
        <li>Using Effect Hook With Cleanup</li>
        <li>Using Multiple Effects</li>
        <li>Building Custom Hook</li>
        <li>Using Context Hook</li>
        <li>Using Reducer Hook</li>
      </ul>
      <FriendList friendList={friendList} />
      <ChatRecipientPicker friendList={friendList} />
    </div>
  )
}

export default Chat
