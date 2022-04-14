# Components and Props

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

- **Function and Class Components**
- **Rendering a Component**
- **Composing Components**
- **Extracting Components**
- **Props are Read-Only**

**Reference**: https://reactjs.org/docs/components-and-props.html

## Function and Class Components

The simplest way to define a component is to write a JavaScript function.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

You can also use an ES6 class to define a component.

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

The above two components are equivalent from React’s point of view. Function and Class components both have some additional features that we will discuss in the next sections.

## Rendering a Component

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

const element = <Welcome name="Sara" />

ReactDOM.render(element, document.getElementById('root'))
```

- We call `ReactDOM.render()` with the `<Welcome name="Sara" />` element.
- React calls the `Welcome` component with `{name: 'Sara'}` as the props.
- Our `Welcome` component returns a `<h1>Hello, Sara</h1>` element as the result.
- React DOM efficiently updates the DOM to match `<h1>Hello, Sara</h1>`.

## Composing Components

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components.

Typically, new React apps have a single `App` component at the very top. However, if you integrate React into an existing app, you might start bottom-up with a small component like `Button` and gradually work your way to the top of the view hierarchy.

## Extracting Components

Don’t be afraid to split components into smaller components. Component can be tricky to change because of all the nesting, and it is also hard to reuse individual parts of it. For example, consider this Comment component:

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  )
}
```

First, we will extract `Avatar`. Next, we will extract a `UserInfo` component that renders an `Avatar` next to the user’s name. We recommend naming props from the component’s own point of view rather than the context in which it is being used.

```jsx
function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  )
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  )
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  )
}
```

Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be extracted to a separate component.

## Props are Read-Only

Whether you declare a component as a function or a class, it must never modify its own props. Pure functions are function that do not attempt to change their inputs, and always return the same result for the same inputs.

**All React components must act like pure functions with respect to their props.**

Of course, application UIs are dynamic and change over time. In the next section, we will introduce a new concept of “state”. State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.
