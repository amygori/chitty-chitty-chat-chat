import './App.css'
import { initializeApp } from 'firebase/app'

import { getAuth, signOut } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import { useAuthState } from 'react-firebase-hooks/auth'

import { ChatRoom } from './ChatRoom'
import LogIn from './LogIn'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

function App() {
  const [user] = useAuthState(auth)
  const logOut = () => signOut(auth)
  return (
    <div className="App">
      {user ? (
        <>
          <header>
            <h1>Chitty-chitty-chat-chat 💬</h1>
            <button onClick={logOut}>Log Out</button>
          </header>
          <ChatRoom db={db} />
        </>
      ) : (
        <LogIn auth={auth} />
      )}
    </div>
  )
}

export default App
