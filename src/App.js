import 'bulma'
import './App.scss'
import { initializeApp } from 'firebase/app'

import { getAuth, signOut } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import { useAuthState } from 'react-firebase-hooks/auth'

import { ChatRoom } from './components/ChatRoom'
import LogIn from './components/LogIn'

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
      <>
        <header>
          <nav className="navbar is-info">
            <div className="navbar-brand">
              <h1 className="title is-4 navbar-item">
                💬 Chitty-chitty-chat-chat
              </h1>
            </div>
            {user && (
              <div className="navbar-menu">
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="field is-grouped">
                      <p className="navbar-item has-text-white">
                        logged in as {user.displayName}
                      </p>
                      <button onClick={logOut} className="button navbar-item">
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </header>
        <main className="m-6">
          {user ? (
            <ChatRoom db={db} loggedInUser={user} />
          ) : (
            <LogIn auth={auth} />
          )}
        </main>
      </>
    </div>
  )
}

export default App
