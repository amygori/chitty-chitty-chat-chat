import { collection, addDoc, query, orderBy, limit } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useState } from 'react'
import { uid } from 'uid'

const ChatRoom = ({ db, loggedInUser }) => {
  const messageCollection = collection(db, 'messages')
  const messagesQuery = query(
    messageCollection,
    orderBy('createdAt'),
    limit(20)
  )
  const [messages] = useCollectionData(messagesQuery)

  return (
    <>
      <div className="messages">
        {messages &&
          messages.map((msg) => (
            <ChatMessage
              text={msg.text}
              username={msg.username}
              key={msg.uid}
            />
          ))}
      </div>
      <NewMessageForm db={db} loggedInUser={loggedInUser} />
    </>
  )
}

const ChatMessage = ({ text, username }) => {
  return (
    <p>
      <span>{username}:</span>
      {text}
    </p>
  )
}

const NewMessageForm = ({ db, loggedInUser }) => {
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = async () => {
    await addDoc(collection(db, 'messages'), {
      username: loggedInUser.displayName,
      text: newMessage,
      createdAt: new Date(),
      uid: uid(),
    })
    setNewMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(newMessage, loggedInUser)
  }
  return (
    <div className="message-input">
      <form onSubmit={handleSubmit}>
        <div className="form-controls">
          <label htmlFor="msg-input">new message</label>
          <input
            id="msg-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
        <div className="form-controls">
          <input type="submit" value="send" />
        </div>
      </form>
    </div>
  )
}

export { ChatRoom }
