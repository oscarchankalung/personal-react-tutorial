import React, { Fragment } from 'react'

import SignUpDialogs from '../components/dialogs/SignUpDialogs'
import WelcomeDialog from '../components/dialogs/WelcomeDialog'

function Dialogs() {
  return (
    <Fragment>
      <h1>Composition vs Inheritance: Dialogs</h1>
      <ul>
        <li>
          <b>Containment</b>: FancyBorder and Dialog
        </li>
        <li>
          <b>Specialization</b>: WelcomeDialog and SignUpDialog
        </li>
        <li>
          <b>Inheritance</b>: not used
        </li>
      </ul>
      <WelcomeDialog />
      <br />
      <SignUpDialogs />
    </Fragment>
  )
}

export default Dialogs
