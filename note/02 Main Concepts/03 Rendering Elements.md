# Rendering Elements

```jsx
const element = <h1>Hello, world</h1>;
```

An element describes what you want to see on the screen. Unlike browser DOM elements, React elements are plain objects, and are cheap to create. React DOM takes care of updating the DOM to match the React elements.

- **Rendering an Element into the DOM**
- **Updating the Rendered Element**
- **React Only Updates What's Necessary**

**Reference**: https://reactjs.org/docs/rendering-elements.html

## Rendering an Element into the DOM

We defined a "root" DOM node where everything inside it will be managed by React DOM. Applications built with just React usually have a single root DOM. if you are integrating React into an existing app, you may multiple isolated root DOM nodes. To render a React element into a root DOM node, pass both to `ReactDOM.render()`.

## Updating the Rendered Element

React elements are immutable. Once you create an element, you can't change its children or attributes. An element is like a single frame in a movie that represents the UI at a certain point in time. With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `ReactDOM.render()`.

## React Only Updates What's Necessary

React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.
