# 12 Thinking In React

One of the many great parts of React is how it makes you think about apps as you build them.

- **Step 1: Break The UI Into A Component Hierarchy**
- **Step 2: Build A Static Version in React**
- **Step 3: Identity The Minimal Representation of UI State**
- **Step 4: Identity Where Your State Should Live**
- **Step 5: Add Inverse Data Flow**

**Reference**: https://reactjs.org/docs/thinking-in-react.html
App: FilterableProductTable

## Step 1: Break The UI Into A Component Hierarchy

The first thing you’ll want to do is to draw boxes around every component (and subcomponent) in the mock and give them all names. But how do you know what should be its own component? Use the same techniques for deciding if you should create a new function or object. One such technique is the single responsibility principle, that is, a component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.

## Step 2: Build A Static Version in React

To build a static version of your app that renders your data model, you’ll want to build components that reuse other components and pass data using props. props are a way of passing data from parent to child. If you’re familiar with the concept of state, don’t use state at all to build this static version. State is reserved only for interactivity.

You can build top-down or bottom-up. In simpler examples, it’s usually easier to go top-down, and on larger projects, it’s easier to go bottom-up and write tests as you build.

At the end of this step, you’ll have a library of reusable components that render your data model. The components will only have `render()` methods since this is a static version of your app.

## Step 3: Identity The Minimal Representation of UI State

To make your UI interactive, you need to be able to trigger changes to your underlying data model. React achieves this with state. Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand.

Ask three questions about each piece of data:

1. Is it passed in from a parent via props? If so, it probably isn’t state.
2. Does it remain unchanged over time? If so, it probably isn’t state.
3. Can you compute it based on any other state or props? If so, it isn’t state.

## Step 4: Identity Where Your State Should Live

Next, we need to identify which component mutates, or owns, this state.

For each piece of state in your application:

- Identify every component that renders something based on that state.
- Find a common owner component above the hierarchy.
- Either the common owner or another component higher up should own the state.
- If you can’t find a component, create a new component solely for holding the state.

## Step 5: Add Inverse Data Flow

So far, we’ve built an app that renders correctly as a function of props and state flowing down the hierarchy. Now it’s time to support data flowing the other way.
