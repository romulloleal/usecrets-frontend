import React, { useState, useEffect, useRef } from 'react'

import { Box } from '@mui/material'
import { AiOutlineHome, AiOutlinePoweroff, AiOutlineUser } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { IoNotificationsOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

import NotificationsComponent from '~/components/Notifications'
import { useAuth } from '~/providers/Auth'
import SocketIo from '~/services/SocketIo'

import { MenuContainer } from './style'

const Menu: React.FC = () => {
  const { user, signOut } = useAuth()

  const [showNotifications, setShowNotifications] = useState(false)
  const [newNotification, setNewNotification] = useState(
    user?.totalNotificatons > 0
  )

  const notificationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    SocketIo.newNotification({ setNewNotification })

    // close notifications when clicked out
    const handleClickOutside = (event: Event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <>
      {/* DESKTOP MENU */}
      <MenuContainer sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Link to='/'>
          <AiOutlineHome onClick={() => window.scrollTo(0, 0)} />
        </Link>

        {user && (
          <>
            <Box className='notifications' ref={notificationsRef}>
              <IoNotificationsOutline
                onClick={() => {
                  setNewNotification(false)
                  setShowNotifications(!showNotifications)
                }}
              />
              <NotificationsComponent
                show={showNotifications}
                setShowNotifications={setShowNotifications}
              />
              {newNotification && <div className='newNotifications' />}
            </Box>

            <Link to={`/profile/${user.profile.userName}`}>
              <AiOutlineUser onClick={() => window.scrollTo(0, 0)} />
            </Link>

            <AiOutlinePoweroff onClick={signOut} />
          </>
        )}
      </MenuContainer>

      {/* MOBILE MENU */}
      <MenuContainer sx={{ display: { xs: 'flex', sm: 'none' } }}>
        <Link to='/'>
          <AiOutlineHome onClick={() => window.scrollTo(0, 0)} />
        </Link>

        <Link to='/search'>
          <FiSearch onClick={() => window.scrollTo(0, 0)} />
        </Link>

        {user && (
          <>
            <Link
              to='/notifications'
              className='notifications'
              onClick={() => {
                window.scrollTo(0, 0)
                setNewNotification(false)
              }}
            >
              <IoNotificationsOutline />
              {newNotification && <div className='newNotifications' />}
            </Link>

            <Link to={`/profile/${user.profile.userName}`}>
              <AiOutlineUser onClick={() => window.scrollTo(0, 0)} />
            </Link>

            <AiOutlinePoweroff onClick={signOut} />
          </>
        )}
      </MenuContainer>
    </>
  )
}

export default Menu
