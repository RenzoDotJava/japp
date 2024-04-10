'use client'

import { signIn } from "next-auth/react";

const LoginPage = () => {

  const logInWithGoogle = async () => {
    await signIn("google", { callbackUrl: 'http://localhost:3000/' })
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={logInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default LoginPage;