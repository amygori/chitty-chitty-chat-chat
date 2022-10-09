import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { uid } from 'uid'

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
    <section className="message-form block">
      <div className="container is-fluid">
        <form onSubmit={handleSubmit}>
          <div className="field has-addons mt-3 is-family-monospace">
            <div className="control">
              <input
                id="msg-input"
                className="input is-info is-medium"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
            <div className="control">
              <button className="button is-info is-medium" type="submit">
                <span>send</span>
                <span class="icon">
                  <i class="fa-solid fa-paper-plane"></i>
                </span>
              </button>
            </div>
          </div>
          <label htmlFor="msg-input" className="label is-sr-only">
            new message
          </label>
        </form>
      </div>
    </section>
  )
}

export default NewMessageForm
