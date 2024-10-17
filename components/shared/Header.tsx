import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

function Header() {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex items-center justify-between px-6 py-4'>
        <div className='ml-[2%]'>
        <Link href='/' className='w-26'>
          <Image src="/assets/images/logo.svg" width={128} height={38} alt="Evently logo"></Image>
        </Link>
        </div>

        <SignedIn>
            <nav className='hidden md:flex-between w-full max-w-xs'>
                <NavItems></NavItems>
            </nav>
        </SignedIn>
        {/* Sign-in or User button on the right with spacing */}
        <div className='flex w-auto justify-end gap-3 mr-[2%]'>
          <SignedIn>
            <UserButton afterSignOutUrl="/"></UserButton>
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-full' size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>    
    </header>
  )
}

export default Header
