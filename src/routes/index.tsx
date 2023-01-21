import { Navigate, Route, Routes as Router } from 'react-router-dom'

import { IRoute } from '~/interfaces'

import RouteComponent from './RouteComponent'
import routes from './Routes'

const Routes = () => {
  return (
    <Router>
      {routes.map((route: IRoute) => (
        <Route
          path={route.path}
          element={
            <RouteComponent
              isPrivate={route.isPrivate}
              redirectWhenLogged={route.redirectWhenLogged}
              component={route.element}
              permissions={route.permissions}
            />
          }
          key={route.path}
        />
      ))}

      <Route path='*' element={<Navigate to='' />} />
    </Router>
  )
}

export default Routes
