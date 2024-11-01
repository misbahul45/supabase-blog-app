import React from 'react'
import { Button } from '../ui/button'
import { LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
    const isAuthenticated=false

    const renderComponents=isAuthenticated?
        <>
        
        </>
        :
        <div className='space-x-4 flex items-center'>
            <Link href={'/register'} className='px-4 py-1.5 text-sm rounded bg-cyan-500 text-slate-100 font-bold hover:bg-cyan-600 flex items-center gap-2'>
                <UserPlus />
                <span>Join Us</span>
            </Link>
            <Link href={'/login'} className='px-4 py-1.5 text-sm rounded bg-white border border-slate-300 text-slate-900 font-bold hover:bg-slate-100 flex items-center gap-2 group'>
                <LogIn className='group-hover:translate-x-0.5 transition-all duration-75' />
                <span>Login</span>
            </Link>
        </div>

  return (
    <header className='sticky top-0 left-0 w-full h-16'>
        <div className="w-full px-10 mx-auto h-full flex justify-between items-center">
            <div className='bg-gradient-to-r from-cyan-700 to-blue-600 shadow-xl shadow-blue-500/10 w-max px-4 py-2 rounded font-semibold text-white'>
                Daily&#96;s<span className="text-cyan-400 font-bold"> Learning</span>
            </div>
            {renderComponents}
        </div>
    </header>
  )
}

export default Navbar