import EditProfile from '~/pages/EditProfile'
import Home from '~/pages/Home'
import Notifications from '~/pages/Notifications'
import Profile from '~/pages/Profile'
import Search from '~/pages/Search'

export default [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/search',
    element: Search,
  },
  {
    path: '/notifications',
    element: Notifications,
    isPrivate: true,
  },
  {
    path: '/editProfile',
    element: EditProfile,
    isPrivate: true,
  },
  {
    path: '/profile/:userName',
    element: Profile,
  },
]
