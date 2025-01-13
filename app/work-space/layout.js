"use client"
import Link from 'next/link'
import React, { Children } from 'react'
import Header from '../components/Header'
import { usePathname, useRouter } from 'next/navigation';

export default function ChatLayout({children}) {
    const router = useRouter();
    const pathname = usePathname()

    // alert(pathname)
  return (
    <div className='w-full bg-gray-100'>
        <Header />

    <div className='flex flex-col w-full lg:w-3/4 m-auto justify-start '>
        <div className='uppercase font-bold my-4 px-2'>Work Space</div>

{/* when presented in mobile ui */}
        <div className="flex w-full lg:hidden">
        <ul className="flex bg-white flex-col bg-red-400 w-full rounded-xl overflow-x-auto scrollbar-hide shadow-sm">
          <li className="border-b border-gray-200">
            <Link
              href="/work-space"
              className={`py-3 block cursor-pointer px-4 hover:bg-blue-100 ease-in-out duration-200 ${
                pathname === "/chats" ? "border-b border-black" : ""
              }`}
            >
              Orders
            </Link>
          </li>
          <li className="border-b border-gray-200">
            <Link
              href="/work-space/returned"
              className={`py-3 block cursor-pointer hover:bg-blue-100 px-4 ease-in-out duration-200 ${
                pathname === "/chats/returned" ? "border-b border-gray-600" : ""
              }`}
            >
              Returned
            </Link>
          </li>
          {/* <li className="border-b border-gray-200">
            <Link
              href="/work-space/waza-updates"
              className={`py-3 block cursor-pointer px-4 hover:bg-blue-100 ease-in-out duration-200 ${
                pathname === "/work-space/waza-updates" ? "border-b border-black" : ""
              }`}
            >

              Wazacom Updates
            </Link>
          </li> */}
    </ul>
        </div>


{/* when it is on large screen */}
        <div className='flex flex-col'>
            
            <div className='w-full hidden lg:block '>
                <ul className='flex items-center bg-white rounded-xl'>
                    <li className='border-b border-gray-200'><Link  className='py-3 block cursor-pointer px-4 hover:bg-blue-100 eas-in-out duration-200' href={`/work-space`}>New Orders</Link></li>
                    <li className='border-b border-gray-200'><Link className='py-3 block cursor-pointer hover:bg-blue-100 px-4 eas-in-out duration-200' href={`/work-space/on-progress`}>On Progress</Link></li>
                    <li className='border-b border-gray-200'><Link className='py-3 block cursor-pointer hover:bg-blue-100 px-4 eas-in-out duration-200' href={`/work-space/completed`}>Completed</Link></li>
                    <li className='border-b border-gray-200'><Link className='py-3 block cursor-pointer hover:bg-blue-100 px-4 eas-in-out duration-200' href={`/work-space/returned`}>Retuned</Link></li>
                    {/* <li className='border-b border-gray-200'><Link  className='py-3 block cursor-pointer px-4 hover:bg-blue-100 eas-in-out duration-200' href={`/work-space/waza-updates`}>wazacom Updates</Link></li> */}

                </ul>

                {/* <ul className='bg-white rounded-xl mt-4'>
                    <li className='border-b border-gray-200'><Link  className='py-3 block cursor-pointer px-4 hover:bg-blue-100 eas-in-out duration-200' href={`/work-space/waza-updates`}>wazacom Updates</Link></li>
                </ul> */}

            </div>

            <div className='w-full  py-4'>
                {children}
            </div>
        </div>
    </div>
    </div>

  )
}
