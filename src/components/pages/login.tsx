"use client"
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

const LoginPage = () => {

  const logInWithGoogle = async () => {
    await signIn("google", { callbackUrl: '/applications' })
  }

  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl flex flex-col" style={{ width: 'clamp(300px, 40%, 500px)' }}>
        <Typography variant="h3" className="text-center">Bienvenido a jApp!</Typography>
        <Typography variant="p" className="text-center mt-5">Simplifica tu búsqueda de empleo con nuestra app de gestión de postulaciones.</Typography>
        <Button className="flex gap-3 text-base mt-5" size={"lg"} onClick={logInWithGoogle} >
          <FaGoogle className="min-h-5 min-w-5" />
          Ingresa con Google
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;