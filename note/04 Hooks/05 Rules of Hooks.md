# Rules of Hooks

Hooks are JavaScript functions, but you need to follow two rules when using them. We provide a [linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) to enforce these rules automatically:

- **Only Call Hooks at the Top Level**
- **Only Call Hooks from React Functions**
- **Explaination: How Does React Know Which State Corresponds to Which Hook**

**Reference**: https://reactjs.org/docs/hooks-rules.html

## Only Call Hooks at the Top Level

**Don’t call Hooks inside loops, conditions, or nested functions.** Instead, always use Hooks at the top level of your React function, before any early returns. By following this rule, you ensure that Hooks are called in the same order each time a component renders. That’s what allows React to correctly preserve the state of Hooks between multiple `useState` and `useEffect` calls.

## Only Call Hooks from React Functions

**Don’t call Hooks from regular JavaScript functions.** Instead, you can call Hooks from React function components and call Hooks from custom Hooks. By following this rule, you ensure that all stateful logic in a component is clearly visible from its source code.

## Explaination: How Does React Know Which State Corresponds to Which Hook

**React relies on the order in which Hooks are called** to know which state corresponds to which `useState` call. Hooks are stored as a linked list. If we skip a Hook during rendering, the order of the Hook calls becomes different. From that point, every next Hook call after the one we skipped would also shift by one, leading to bugs.

If we want to run an effect conditionally, we can put that condition inside our Hook:

```jsx
// 🔴 We're breaking the first rule by using a Hook in a condition
if (name !== '') {
  useEffect(function persistForm() {
    localStorage.setItem('formData', name)
  })
}
```

```jsx
useEffect(function persistForm() {
  // 👍 We're not breaking the first rule anymore
  if (name !== '') {
    localStorage.setItem('formData', name)
  }
})
```
