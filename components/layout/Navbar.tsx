'use client';
import React from 'react';
import { Button } from '../ui/button';
import { LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathName = usePathname();

    if (pathName === '/login' || pathName === '/register') {
        return null;
    }

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [scrolling, setScrolling] = React.useState(true);
    const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolling(true);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            if (window.scrollY > 50) {
                scrollTimeoutRef.current = setTimeout(() => {
                    setScrolling(false);
                }, 2000);  
            } else {
                scrollTimeoutRef.current = null;
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const renderComponents = isAuthenticated ? (
        <div>
            <span className="text-white">Welcome Back!</span>
        </div>
    ) : (
        <div className='space-x-4 flex items-center'>
            <Link href={'/register'} className='px-4 py-2 text-sm rounded bg-cyan-500 text-slate-100 font-bold hover:bg-cyan-600 flex items-center gap-2'>
                <UserPlus />
                <span>Join Us</span>
            </Link>
            <Link href={'/login'} className='px-4 py-2 text-sm rounded bg-white border border-slate-300 text-slate-900 font-bold hover:bg-slate-100 flex items-center gap-2 group'>
                <LogIn className='group-hover:translate-x-0.5 transition-all duration-75' />
                <span>Login</span>
            </Link>
        </div>
    );

    return (
        <header className={`absolute top-0 left-0 w-full h-16 backdrop-blur-lg ${scrolling ? 'translate-y-0' : '-translate-y-20'} transition-all duration-75`}>
            <div className="w-full px-10 mx-auto h-full flex justify-between items-center">
                <Link href={'/'} className='bg-gradient-to-r from-cyan-400 to-blue-500 shadow-xl shadow-blue-500/10 w-max px-4 py-2 rounded font-semibold text-white'>
                    Compontae<span className="text-cyan-400 font-bold"> Enrich</span>
                </Link>
                {renderComponents}
            </div>
        </header>
    );
};

export default Navbar;
