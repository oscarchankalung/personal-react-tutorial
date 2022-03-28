import React from 'react'

import useFriendStatus from './useFriendStatus'
import { getStatus } from './Helpers'
import { Friend } from '../../pages/Chat'

export type Status = boolean | null

interface ListItemProps {
  friend: Friend
}

const FriendListItem: React.FC<ListItemProps> = props => {
  const isOnline = useFriendStatus(props.friend.id)

  return (
    <li>
      {props.friend.name}:{' '}
      <span style={{ color: isOnline ? 'green' : 'black' }}>
        {getStatus(isOnline)}
      </span>
    </li>
  )
}

interface ListProps {
  friendList: Friend[]
}

const FriendList: React.FC<ListProps> = props => {
  return (
    <div>
      <h2>Friend List</h2>
      <ul>
        {props.friendList.map(friend => (
          <FriendListItem key={friend.id} friend={friend} />
        ))}
      </ul>
    </div>
  )
}

export default FriendList
