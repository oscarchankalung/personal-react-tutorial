import React, { ChangeEvent } from 'react'
import Dialog from './Dialog'

interface State {
  login: string
}

type Props = Record<string, never>

class SignUpDialogs extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.state = { login: '' }
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ login: e.target.value })
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`)
  }

  render() {
    return (
      <Dialog
        title="Mars Exploration Program"
        message="How should we refer to you?"
      >
        <input value={this.state.login} onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>Sign Me Up!</button>
      </Dialog>
    )
  }
}

export default SignUpDialogs
