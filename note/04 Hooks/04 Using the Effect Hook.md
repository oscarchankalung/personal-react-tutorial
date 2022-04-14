# Using the Effect Hook

- **Effects Without Cleanup**
  - **Example Using Classes**
  - **Example Using Hooks**
  - **Detailed Explanation**
- **Effects with Cleanup**
  - **Example Using Classes**
  - **Example Using Hooks**
- **Tips for Using Effects**
  - **Tip: Use Multiple Effects to Separate Concerns**
  - **Explaination: Why Effects Run on Each Update**
  - **Tip: Optimizing Performance by Skipping Effects**

**Reference**: https://reactjs.org/docs/hooks-effect.html
App: Hooks

## Effects Without Cleanup

Sometimes, we want to **run some additional code after React has updated the DOM**. Network requests, manual DOM mutations, and logging are common examples of effects that don’t require a cleanup.

### Example Using Classes

In React class components, the `render` method itself shouldn’t cause side effects. It would be too early — we typically want to perform our effects _after_ React has updated the DOM.

This is why in React classes, we put side effects into `componentDidMount` and `componentDidUpdate`. Note how **we have to duplicate the code between these two lifecycle methods in class**. This is because in many cases we want to perform the same side effect regardless of whether the component just mounted, or if it has been updated.

### Example Using Hooks

By using effect Hook, you tell React that your component needs to do something after render. Placing `useEffect` inside the component lets us access the state variable (or any props) right from the effect. By default, it runs both after the first render and after every update. (We will later talk about how to customize this.)

### Detailed Explanation

**The function passed to `useEffect` is going to be different on every render**. This is intentional. In fact, this is what lets us read the state from inside the effect without worrying about it getting stale. Every time we re-render, we schedule a different effect, replacing the previous one.

**Unlike `componentDidMount` or `componentDidUpdate`, effects scheduled with `useEffect` don’t block the browser from updating the screen**. This makes your app feel more responsive. The majority of effects don’t need to happen synchronously. In the uncommon cases where they do (such as measuring the layout), there is a separate [`useLayoutEffect`](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) Hook.

**The `useLayoutEffect` is identical to `useEffect`, but instead of firing after rendering, it fires synchronously after all DOM mutations and before rendering**. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside useLayoutEffect will be flushed synchronously, before the browser has a chance to paint.

## Effects with Cleanup

However, some effects do require cleanup. For example, **we might want to set up a subscription to some external data source**. In that case, it is important to clean up so that we don’t introduce a memory leak.

### Example Using Classes

In a React class, you would typically set up a subscription in `componentDidMount`, and clean it up in `componentWillUnmount`. Notice how `componentDidMount` and `componentWillUnmount` need to mirror each other. Lifecycle methods force us to split this logic even though conceptually code in both of them is related to the same effect.

### Example Using Hooks

With hook, code for adding and removing a subscription is so tightly related that `useEffect` is designed to keep it together. If your effect optionally returns a function, React will run it when it is time to clean up.

React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time.

## Tips for Using Effects

### Tip: Use Multiple Effects to Separate Concerns

One of the problems we outlined in the Motivation for Hooks is that class lifecycle methods often contain unrelated logic, but related logic gets broken up into several methods. Just like you can use the State Hook more than once, you can also use several effects. This lets us separate unrelated logic into different effects.

**Hooks let us split the code based on what it is doing rather than a lifecycle method name**. React will apply every effect used by the component, in the order they were specified.

### Explaniation: Why Effects Run on Each Update

If you’re used to classes, you might be wondering why the effect cleanup phase happens after every re-render, and not just once during unmounting. Consider the following example where the side effect is a subscription with dependency.

```jsx
componentDidMount() {
  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}

componentWillUnmount() {
  ChatAPI.unsubscribeFromFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}
```

**What happens if the dependency changes while the component is on the screen?** Our component would continue displaying the online status of a different friend. This is a bug. We would also cause a memory leak or crash when unmounting since the unsubscribe call would use the wrong friend ID. In a class component, we would need to add `componentDidUpdate` to handle this case.

```jsx
componentDidUpdate(prevProps) {
  ChatAPI.unsubscribeFromFriendStatus(
    prevProps.friend.id,
    this.handleStatusChange
  );

  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}
```

Forgetting to handle `componentDidUpdate` properly is a common source of bugs in React applications. With Hooks, `useEffect` handles updates by default. This ensures consistency and prevents bugs that are common in class components due to missing update logic.

### Tip: Optimizing Performance by Skipping Effects

In some cases, cleaning up or applying the effect after every render might create a performance problem. In class components, we can solve this by writing an extra comparison with `prevProps` or `prevState` inside componentDidUpdate:

```jsx
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

This requirement is common enough that it is built into the useEffect Hook API. You can tell React to skip applying an effect if certain values haven’t changed between re-renders. To do so, pass an array as an optional second argument to useEffect:

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`
}, [count]) // Only re-run the effect if count changes
```

If you use this optimization, **make sure the array includes all values from the component scope (such as props and state) that change over time and that are used by the effect**. Otherwise, your code will reference stale values from previous renders.
