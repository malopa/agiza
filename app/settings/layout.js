"use client"
import Link from 'next/link'
import React, { Children } from 'react'
import Header from '../components/Header'
import { usePathname, useRouter } from 'next/navigation';
import Footer from '../Footer';

export default function ChatLayout({children}) {
    const router = useRouter();
    const pathname = usePathname()

    // alert(pathname)
  return (
    <div className='w-full bg-gray-100 mb-4'>
        <Header />

    <div className='flex flex-col w-full lg:w-3/4 m-auto justify-start '>
        <div className='uppercase font-bold my-4 px-2'>Settings</div>

{/* when presented in mobile ui */}
    <div className="flex w-full lg:hidden">
    <ul className="flex bg-white overflow-x-auto bg-red-400 w-full rounded-xl scrollbar-hide shadow-sm">
  <li className="border-b border-gray-200 flex-shrink-0">
    <Link
      className="py-3 block min-w-max cursor-pointer px-4 hover:bg-blue-100 ease-in-out duration-200 text-sm"
      href={`/settings`}
    >
      Staff Members
    </Link>
  </li>
  <li className="border-b border-gray-200 flex-shrink-0">
    <Link
      className="py-3 block min-w-max cursor-pointer px-4 hover:bg-blue-100 ease-in-out duration-200 text-sm"
      href={`/settings/roles`}
    >
      Roles
    </Link>
  </li>
  <li className="border-b border-gray-200 flex-shrink-0">
    <Link
      className="py-3 block min-w-max cursor-pointer px-4 hover:bg-blue-100 ease-in-out duration-200 text-sm"
      href={`/settings/my-account`}
    >
      My Account
    </Link>
  </li>
  <li className="border-b border-gray-200 flex-shrink-0">
    <Link
      className="py-3 block min-w-max cursor-pointer px-4 hover:bg-blue-100 ease-in-out duration-200 text-sm"
      href={`/settings/change-password`}
    >
      Change Password
    </Link>
  </li>
</ul>
    </div>


{/* when it is on large screen */}
        <div className='flex flex bg-gray-100'>
            
            <div className='w-full  lg:w-1/5 hidden lg:flex lg:flex-col lg:border-r lg:border-gray-200 lg:flex-col mb-4'>
                <ul className='hidden lg:flex lg:flex-col items-center bg-white rounded-xl lg:min-h-[60vh] justify-start lg:max-h-[60vh]'>
                    <li className='border-b border-gray-200 w-full'><Link  className='py-3 block w-full cursor-pointer px-4 hover:bg-blue-100 eas-in-out duration-200 text-sm' href={`/settings`}>Staff Members</Link></li>
                    <li className='border-b border-gray-200 w-full'><Link className='py-3 block w-full cursor-pointer hover:bg-blue-100 px-4 eas-in-out duration-200 text-sm' href={`/settings/roles`}>Roles</Link></li>
                    <li className='border-b border-gray-200 w-full'><Link className='py-3 block  w-full cursor-pointer hover:bg-blue-100 px-4 eas-in-out duration-200 text-sm' href={`/settings/my-account`}>My Account</Link></li>
                    <li className='border-b border-gray-200 w-full'><Link className='py-3 block w-full cursor-pointer hover:bg-blue-100 px-4 eas-in-out duration-200 text-sm' href={`/settings/change-password`}>Change Password</Link></li>

                </ul>

            </div>

            <div className='w-full lg:w-4/5  py-4'>
                {children}
            </div>
        </div>
    </div>
        <Footer />

    </div>

  )
}
