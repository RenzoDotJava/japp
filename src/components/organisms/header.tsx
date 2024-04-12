"use client"
import React from 'react'
import { TbLogout } from "react-icons/tb";
import { Session } from 'next-auth';
import { signOut } from "next-auth/react"

import { Typography } from '../ui/typography'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  session: Session
}

const Header: React.FC<HeaderProps> = ({ session }) => {

  return (
    <div className='bg-black px-8 py-4 flex justify-between'>
      <Typography className='text-white cursor-pointer' variant="h1">jApp</Typography>
      <div className="flex items-center gap-4">
        <Typography className='text-white hidden sm:block' variant="p">Bienvenido, <strong>{session.user?.name}</strong></Typography>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={session.user?.image!} />
              <AvatarFallback>{session.user?.name![0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mr-3'>
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}><TbLogout className='min-h-4 min-w-4 mr-2 text-primary' /><span>Salir</span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Header