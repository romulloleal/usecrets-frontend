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
  setNewNotificaion,
}: {
  setNewNotificaion: (value: boolean) => void
}) => {
  socket.on('newNotification', () => {
    setNewNotificaion(true)
  })
}

export default {
  socketConnect,
  newNotification,
  joinRoom,
}
