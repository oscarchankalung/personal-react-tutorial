const friendList = [
  { id: '1', online: true },
  { id: '2', online: false },
  { id: '3', online: false },
]

class ChatAPI {
  static subscribeToFriendStatus(
    id: string,
    callback: (status: boolean | null) => void
  ): void {
    setTimeout(
      callback,
      1000,
      friendList.find(friend => friend.id === id)?.online ?? null
    )
  }

  static unsubscribeToFriendStatus(
    id: string,
    callback: (status: boolean | null) => void
  ): void {
    callback(null)
  }
}

export default ChatAPI
