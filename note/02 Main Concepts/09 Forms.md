# Forms

HTML form elements work a bit differently from other DOM elements in React, because form elements naturally keep some internal state. For example:

```jsx
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="submit">
</form>
```

This form has the default HTML form behavior of browsing to a new page when the user submits the form. But in most cases, it's more desirable to have a JavaScript function that handles the submission of the form and has access to the data that the user entered into the form. The standard way to achieve this is with a techniques called "controlled components".

- **Controlled Components**
  - **The input Tag**
  - **The textarea Tag**
  - **The select Tag**
  - **The file input Tag**
- **Handling Multiple Inputs**
- **Controlled Input Null Value**
- **Alernatives to Controlled Components**
- **Fully-Fledged Solutions**

**Reference**: https://reactjs.org/docs/forms.html

## Controlled Components

In HTML, form elements typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with `setState()`.

We can combine the two by making the React state by the "single source of truth". Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a "controlled component".

### The input Tag

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSybmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```

### The textarea Tag

In HTML, a `<textarea>` element defines its text by its children.

```jsx
<textarea>Hello there, this is some text in a text area</textarea>
```

In React, a `<textarea>` uses a `value` attributes instead.

```jsx
<form onSubmit={this.handleSubmit}>
  <label>
    Name:
    <textarea
      type="text"
      value={this.state.value}
      onChange={this.handleChange}
    />
  </label>
  <input type="submit" value="Submit" />
</form>
```

### The select Tag

In HTML, `<select>` creates a drop-down list. Note that the Coconut option is initially selected, because of the `selected` attribute.

```jsx
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option value="cocount" selected>
    Coconut
  </option>
  <option value="mango">Mango</option>
</select>
```

In React, instead of using the `selected` attribute, uses a `value` attribute on the root `select` tag.

```jsx
<form onSubmit={this.handleSubmit}>
  <label>
    Pick your favourite flavor:
    <select value={this.state.value} onChange={this.handleChange}>
      <option value="grapefruit">Grapefruit</option>
      <option value="lime">Lime</option>
      <option value="cocount">Coconut</option>
      <option value="mango">Mango</option>
    </select>
  </label>
  <input type="submit" value="Submit">
</form>
```

### The file input Tag

In HTML, an `<input type="file">` lets the user choose one or more files from thier device storage to be uploaded to a server or manipulated by JavaScript via the File API.

```jsx
<input type="file" />
```

Because its value is read-only, it is an uncontrolled component in React. It is discusssed together with other uncontrolled components later in the documentation.

## Handling Multiple Inputs

When you need to handle multiple controlled `input` elements, you can add a `name` attribute to each element and let the handler function choose what to do based on the value fo `event.target.name`.

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    )
  }
}
```

## Controlled Input Null Value

Specifying the `value` prop on a controlled component prevents the user from changing the input unless you desire so. If the input is still editable, you may have accidentally set `value` to `undefined` or `null`.

The following code demonstrates this. (The input is locked at first but becomes editable after a short delay.)

```jsx
ReactDOM.render(<input value="hi" />, mountNode)

setTimeout(function () {
  React.DOM.render(<input value={null} />, mountNode)
}, 1000)
```

## Alernatives to Controlled Components

It can sometimes be tedious to use controlled components, because you need to write an event handler for every way your data can change and pipe all of the input state through a React component. This can become particularly annoying when you are converting a preexisting codebase to React, or integrating a React application with a non-React library. In these situations, you might want to check out [uncontrolled components](https://reactjs.org/docs/uncontrolled-components.html), an alternative technique for implementing input forms.

## Fully-Fledged Solutions

If you’re looking for a complete solution including validation, keeping track of the visited fields, and handling form submission, [Formik](https://formik.org/) is one of the popular choices.
