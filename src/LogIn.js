import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

const LogIn = ({ auth }) => {
  return <button onClick={useSignInWithGoogle(auth)}>Sign In</button>
}

export default LogIn
