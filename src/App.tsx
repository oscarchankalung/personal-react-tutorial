import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

import './App.scss'

import Layout from './app/layout/Layout'
import TicTacToe from './app/pages/TicTacToe'
import TemperatureCalculator from './app/pages/TemperatureCalculator'
import Dialogs from './app/pages/Dialogs'
import Table from './app/pages/Table'
import Chat from './app/pages/Chat'
import NotFound from './app/pages/NotFound'

export const RouteList = [
  {
    id: 'app',
    name: 'React Documentation: App',
    path: '/',
    to: '/',
    element: <Layout />,
    children: [
      {
        id: 'app-01',
        name: 'React Tutorial: Tic-Tac-Toe',
        path: '/react-tutorial',
        to: '/react-tutorial',
        element: <TicTacToe />,
        navigation: true,
      },
      {
        id: 'app-02',
        name: 'Lifting State Up: Temperature Calculator',
        path: '/lifting-state-up',
        to: '/lifting-state-up',
        element: <TemperatureCalculator />,
        navigation: true,
      },
      {
        id: 'app-03',
        name: 'Composition vs Inheritance: Dialogs',
        path: '/composition-vs-inheritance',
        to: '/composition-vs-inheritance',
        element: <Dialogs />,
        navigation: true,
      },
      {
        id: 'app-04',
        name: 'Thinking in React: Filterable Product Table',
        path: '/thinking-in-react',
        to: '/thinking-in-react',
        element: <Table />,
        navigation: true,
      },
      {
        id: 'app-05',
        name: 'Using Hooks: Chat',
        path: '/using-hooks',
        to: '/using-hooks',
        element: <Chat />,
        navigation: true,
      },
      {
        id: 'not-found',
        name: 'Page Not Found',
        path: 'page-not-found',
        to: 'page-not-found',
        element: <NotFound />,
        navigation: false,
      },
      {
        id: 'else',
        name: 'Else',
        path: '*',
        to: '*',
        element: <Navigate to="page-not-found" replace />,
        navigation: false,
      },
    ],
  },
]

const App: React.FC = () => {
  const element = useRoutes(RouteList)
  return element
}

export default App
