# State and Lifecycle

In Rendering Elements, we have only learned one way to update the UI. We call `ReactDOM.render()` to change the rendered output. In this section, we will learn how to make the `Clock` component truly reusable and encapsulated. It will set up its own timer and update itself every second.

```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  )
}

function tick() {
  ReactDOM.render(<Clock date={new Date()} />, document.getElementById('root'))
}

setInterval(tick, 1000)
```

- **Converting a Function to a Class**
- **Adding Local State to a Class**
- **Adding Lifecycle Methods to a Class**
- **Using State Correctly**
- **The Data Flows Down**

**Reference**: https://reactjs.org/docs/state-and-lifecycle.html

## Converting a Function to a Class

You can convert a function component like `Clock` to a class in five steps:

1. Create an ES6 class, with the same name, that extends `React.Component`.
2. Add a single empty method to it called `render()`.
3. Move the body of the function into the `render()` method.
4. Replace `props` with `this.props` in the `render()` body.
5. Delete the remaining empty function declaration.

The render method will be called each time an update happens, but as long as we render the class into the same DOM node, only a single instance of the class will be used. This lets us use additional features such as local state and lifecycle methods.

## Adding Local State to a Class

We will move the `date` from props to state in three steps:

1. Replace `this.props` with `this.state` in the `render()` method.
2. Add a class constructor that assigns the initial `this.state`.
3. Remove the prop from the element.

## Adding Lifecycle Methods to a Class

In applications with many components, it’s very important to free up resources taken by the components when they are destroyed.

We want to set up a timer whenever the `Clock` is rendered to the DOM for the first time. This is called “mounting” in React. We also want to clear that timer whenever the DOM produced by the `Clock` is removed. This is called “unmounting” in React.

We can declare special methods on the component class to run some code when a component mounts and unmounts. These methods are called “lifecycle methods”.

The `componentDidMount()` method runs after the component output has been rendered to the DOM. This is a good place to set up a timer. We will tear down the timer in the `componentWillUnmount()` lifecycle method. Finally, we will implement a method called `tick()` that the `Clock` component will run every second. It will use `this.setState()` to schedule updates to the component local state:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date(),
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'))
```

## Using State Correctly

### Do Not Modify State Directly

```jsx
// Wrong
this.state.comment = 'Hello'

// Correct
this.setState({ comment: 'Hello' })
```

### State Updates May Be Asynchronous

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
})

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment,
}))
```

### State Updates are Merged

```jsx
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}

componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

## The Data Flows Down

Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class.

This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components.

```jsx
<FormattedDate date={this.state.date} />
```

This is commonly called a “top-down” or “unidirectional” data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components “below” them in the tree.
