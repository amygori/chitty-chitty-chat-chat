import { collection, query, orderBy, limit } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import NewMessageForm from './NewMessageForm'
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
      <section className="messages block box">
        <div className=" container is-fluid">
          {messages &&
            messages.map((msg) => (
              <ChatMessage
                text={msg.text}
                username={msg.username}
                key={msg.uid}
              />
            ))}
        </div>
      </section>
      <section>
        <NewMessageForm db={db} loggedInUser={loggedInUser} />
      </section>
    </>
  )
}

const ChatMessage = ({ text, username }) => {
  return (
    <div className="is-family-monospace block">
      <p className="has-text-weight-bold">{username} </p>
      <p className="">{text}</p>
    </div>
  )
}

export { ChatRoom }
