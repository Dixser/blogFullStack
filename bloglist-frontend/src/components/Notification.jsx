
import { useNotification } from '../contexts/NotificationContext'

const Notification = () => {
  const [notification] = useNotification()

  if (!notification) return null

  return (
    <div style={{
      color: 'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }}>
      {notification}
    </div>
  )
}

export default Notification
