import { collection, getDocs } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const ChatRoom = ({ db }) => {
  const messageCollection = collection(db, 'messages')
  console.log(messageCollection)
  const [messages] = useCollectionData(messageCollection, { idField: 'id' })

  return (
    <div className="messages">
      {messages &&
        messages.map((msg) => <ChatMessage text={msg.text} key={msg.id} />)}
    </div>
  )
}

const ChatMessage = ({ text }) => {
  return <p>{text}</p>
}

export { ChatRoom }
