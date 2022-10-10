import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

const LogIn = ({ auth }) => {
  const [signInWithGoogle] = useSignInWithGoogle(auth)

  return (
    <div className="container">
      <button
        className="button is-large is-fullwidth is-warning"
        onClick={() => signInWithGoogle()}
      >
        Sign In with Google
      </button>
    </div>
  )
}

export default LogIn
