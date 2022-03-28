import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

const Layout: React.FC = () => {
  return (
    <Fragment>
      <header>
        <h1>React Documentation: App</h1>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </Fragment>
  )
}

export default Layout
