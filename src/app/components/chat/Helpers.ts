export const getStatus = (isOnline: boolean | null) => {
  switch (isOnline) {
    case null:
      return 'Loading...'
    case true:
      return 'Online'
    case false:
      return 'Offline'
  }
}
