# Lists and Keys

In React, we use `map()` function to transform arrays into lists of elements.

- **Rendering Multiple Components**
- **Basic List Component**
- **Extracting Components with Keys**
- **Keys Must Only Be Unique Among Siblings**
- **Embedding `map()` in JSX**

**Reference**: https://reactjs.org/docs/lists-and-keys.html

## Lists

### Rendering Multiple Components

You can build collections of elements and include them in JSX using curly braces `{}`.

```jsx
const numbers = [1, 2, 3, 4, 5]
const listItems = numbers.map(number => <li>{number}</li>)

React.DOM.render(<ul>{listItems}</ul>, document.getElementById('root'))
```

### Basic List Component

Usually you would render lists inside a component.

```jsx
function NumberList(props) {
  const number = props.numbers
  const listItems = numbers.map(number => (
    <li key={number.toString()}>{number}</li>
  ))

  return <ul>{listItems}</ul>
}

const number = [1, 2, 3, 4, 5]
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
)
```

When you run this code, you’ll be given a warning that a key should be provided for list items. A “key” is a special string attribute you need to include when creating lists of elements.

## Keys

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity. The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys.

```jsx
const todoItems = todos.map(todo => <li key={todo.id}>{todo.text}</li>)
```

### Extracting Components with Keys

Keys only make sense in the context of the surrounding array. A good rule of thumb is that elements inside the `map()` call need keys.

```jsx
function ListItem(props) {
  const value = props.value
  return <li key={value.toString()}>{value}</li>
}

function NumberList(props) {
  const numbers = props.numbers
  const listItems = numbers.map(number => (
    <ListItem key={number.toString()} value={number} />
  ))

  return <ul>{listItems}</ul>
}

const numbers = [1, 2, 3, 4, 5]
React.DOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
)
```

### Keys Must Only Be Unique Among Siblings

Keys used within arrays should be unique among their siblings. However, they don’t need to be globally unique. We can use the same keys when we produce two different arrays.

```jsx
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  { id: 1, title; 'Hello Word', content: 'Welcome to learning React!' },
  { id: 2, title: 'Installation', content: 'You can install React from npm.' }
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

### Embedding `map()` in JSX

JSX allows embedding any expression in curly braces so we could inline the `map()` result.

```jsx
function NumberList(props) {
  const numbers = props.numbers
  return (
    <ul>
      {numbers.map(number => (
        <ListItem key={number.toString()} value={numbers} />
      ))}
    </ul>
  )
}
```

Sometimes this results in clearer code, but this style can also be abused. Like in JavaScript, it is up to you to decide whether it is worth extracting a variable for readability. Keep in mind that if the `map()` body is too nested, it might be a good time to extract a component.
