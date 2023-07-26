import React from 'react'
import Image from 'next/image'
import logo from '../../../../../images/logo.svg'
export const Logo = () => {
  return (
    <div className='border-b px-6 '>
      <Image src={logo} width={213} height={36}  alt='logo satrica' className='my-4'/>
    </div>
  )
}
