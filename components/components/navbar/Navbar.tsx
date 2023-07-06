'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import userImage from '../../../images/user.png'
import React from 'react'
import { StaticImageData } from 'next/image';

export const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 shadow-md	bg-blue-800 text-white uppercase'>
      <h1 className='text-base font-bold'>Servicio autónomo de administración tributaria del municipio cabimas</h1>
      
      <div>
      <Avatar>
      <AvatarImage className='object-cover ' src={userImage.toString()} alt="userIcon" />
      <AvatarFallback>AV</AvatarFallback>
    </Avatar>
      </div>

    </div>
  )
}
