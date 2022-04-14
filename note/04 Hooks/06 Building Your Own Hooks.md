# Building Your Own Hooks

Building your own Hooks lets you extract component logic into reusable functions. Traditionally in React, we’ve had two popular ways to share stateful logic between components: render props and higher-order components. We will now look at how Hooks solve many of the same problems without forcing you to add more components to the tree.

- **Extracting a Custom Hook**
- **Using a Custom Hook**
- **Using a Reducer Hook**

**Reference**: https://reactjs.org/docs/hooks-custom.html
App: Hooks

## Extracting a Custom Hook

When we want to share logic between two JavaScript functions, we extract it to a third function. Both components and Hooks are functions, so this works for them too!

**A custom Hook is a JavaScript function whose name starts with "use" and that may call other Hooks.**

Unlike a React component, a custom Hook doesn’t need to have a specific signature. We can decide what it takes as arguments, and what, if anything, it should return. In other words, it’s just like a normal function. Its name should always start with `use` so that you can tell at a glance that the rules of Hooks apply to it.

## Using a Custom Hook

In the beginning, our stated goal was to remove the duplicated logic. Now that we’ve extracted this logic to a custom hook, we can just use it. All we did was to extract some common code between two functions into a separate function. **Custom Hooks are a convention that naturally follows from the design of Hooks, rather than a React feature.**
