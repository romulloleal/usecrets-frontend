import { io } from 'socket.io-client'

const socket = io(process.env.REACT_APP_API_URL as string)

const socketConnect = () => {
  socket.on('connect', () => {
    //
  })
}

const joinRoom = (userName: string) => {
  socket.emit('joinRoom', userName)
}

const newNotification = ({
  setNewNotification,
}: {
  setNewNotification: (value: boolean) => void
}) => {
  socket.on('newNotification', () => {
    setNewNotification(true)
  })
}

export default {
  socketConnect,
  newNotification,
  joinRoom,
}
