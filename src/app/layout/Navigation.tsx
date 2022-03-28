import React from 'react'
import { Link } from 'react-router-dom'
import { RouteList } from '../../App'

const Navigation: React.FC = () => {
  const NavigationList = RouteList[0].children.filter(route => route.navigation)

  return (
    <nav>
      <ol>
        {NavigationList.map(navigation => (
          <li key={navigation.id}>
            <Link to={navigation.to}>{navigation.name}</Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Navigation
