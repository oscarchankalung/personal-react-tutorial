# Hooks at a Glance

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

- **State Hook**
- **Effect Hook**
- **Rules of Hooks**
- **Building Your Own Hooks**

**Reference**: https://reactjs.org/docs/hooks-overview.html

## State Hook

The State hook is called inside a function component to add some local state it. React will preserve the state between re-renders. `useState` returns a pair: the current state value and a function that lets you to update it.

```jsx
import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Click Me
      </button>
    </div>
  )
}
```

The only argument to `useState` is the initial state. The initial state argument is only used during the first render.

You can use the State Hook more than once in a single component.

Hook are functions that let you “hook into” React state and lifecycle features from function components.

## Effect Hook

You’ve likely performed data fetching, subscriptions, or manually changing the DOM from React components before. We call these operations “side effects” because they can affect other components and can’t be done during rendering.

The Effect Hook adds the ability to perform side effects from a function component. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes, but unified into a single API.

```jsx
import React, { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Click Me
      </button>
    </div>
  )
}
```

When you call `useEffect`, you’re telling React to run your “effect” function after flushing changes to the DOM. Effects are declared inside the component so they have access to its props and state. By default, React runs the effects after every render, including the first render.

Effects may also optionally specify how to “clean up” after them by returning a function. By returning a function, Rect would call the function when the component unmounts, as well as before re-running the effect due to a subsequent render. If you want, there's a way to tell React to skip re-running the effect.

```jsx
import React, { useState, useEffect } from 'react'

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange(status) {
    setIsOnline(status.isOnline)
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
    }
  })

  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}
```

Just like with `useState`, you can use more than a single effect in a component.

Hooks let you organize side effects in a component by what pieces are related (such as adding and removing a subscription), rather than forcing a split based on lifecycle methods.

## Rules of Hooks

Hooks are JavaScript functions, but they impose two additional rules:

- Only call Hooks at the top level.
- Only call Hooks from React functiona.

We provide a linter plugin to enforce these rules automatically.

## Building Your Own Hooks

Sometimes, we want to reuse some stateful logic between components. Traditionally, there were two popular solutions to this problem: higher-order components and render props. Custom Hooks let you do this, but without adding more components to your tree.

```jsx
import React, { useState, useEffect } from 'react'

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange(status) {
    setIsOnline(status.isOnline)
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange)
    }
  })

  return isOnline
}
```

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id)

  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}
```

```jsx
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id)

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>{props.friend.name}</li>
  )
}
```

The state of each component is completely independent. Hooks are a way to reuse stateful logic, not state itself. In fact, each call to a Hook has a completely isolated state — so you can even use the same custom Hook twice in one component.

Custom Hooks are more of a convention than a feature. If a function’s name starts with ”use” and it calls other Hooks, we say it is a custom Hook. The `useSomething` naming convention is how our linter plugin is able to find bugs in the code using Hooks.
