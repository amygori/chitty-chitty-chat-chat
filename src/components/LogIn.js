import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

const LogIn = ({ auth }) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

  return <button onClick={() => signInWithGoogle()}>Sign In with Google</button>
}

export default LogIn
