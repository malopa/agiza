"use client"
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Logout from './Logout'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { useMenu } from '../context/menuContext'
import Image from 'next/image'

export default function Header() {
  const {isVisible,setIsVisible} = useMenu();
  return (
    <div className='w-full'>
    <Head>
        <title>agiza-server</title>
        <meta property="og:title" content="wazaxom" key="wazacom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="relative bg-[#6F96BD] h-[4rem] text-center text-white flex justify-end items-center w-full p-2">
        <div className="flex items-center justify-start w-full mb-6 ">
          
          <div style={{ position: "absolute", width: "30px", height: "30px",left:10 ,top:14}}>
              <Image
                src="/icon.png"
                alt="Icon"
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 
               (max-width: 1200px) 50vw, 
               33vw"

              />
            </div>
            <div className="ml-10 font-bold mt-5">Agiza</div>
        </div>


        <ul className="hidden w-3/4 lg:flex items-center mr-4">
          <li><Link   className="mx-2 p-2" href={`/dashboard`}>Dashboard</Link></li>
          <li><Link  className="mx-2 p-2" href={`/client`}>Clients</Link></li>
          <li>
            <Link   
              className="py-2 px-4 block" 
              href={`/Suppliers`}>Suppliers</Link>
            </li>
          <li><Link  className="mx-2 p-2" href={`/work-space`}>Work space</Link></li>
          <li><Link  className="mx-2 p-2" href={`/settings`}>Settings</Link></li>
          
          <li className='ml-4'><Logout /></li>
        </ul>

        <div className='flex lg:hidden  justify-end cursor-pointer  p-2'>
        {isVisible? <CloseOutlined onClick={()=>setIsVisible(!isVisible)} /> :
          <MenuOutlined onClick={()=>setIsVisible(!isVisible)} />}
        </div>

        <div className={`${
      isVisible ? 'block' : 'hidden'
    } absolute z-20 top-10 mt-4 w-full bg-blue-400 right-0`}
    >
          <ul className="text-left w-full">
              <li>
                <Link 
                  onClick={()=>setIsVisible(!isVisible)} 
                  className="py-2 px-4 block" 
                  href={`/dashboard`}>Dashboard</Link>
              </li>
              <li>
                <Link  
                  onClick={()=>setIsVisible(!isVisible)} 
                  className="py-2 px-4 block" 
                  href={`/client`}>Clients</Link>
              </li>

              <li>
                <Link  onClick={()=>setIsVisible(!isVisible)} 
                  className="py-2 px-4 block" 
                  href={`/client`}>Suppliers</Link>
              </li>

              <li>
                <Link onClick={()=>setIsVisible(!isVisible)} 
                className="py-2 px-4 block" href={`/chats`}>Work space</Link></li>
              <li><Link onClick={()=>setIsVisible(!isVisible)} 
              className="py-2 px-4 block " href={`/notifications`}>Settings</Link></li>
              <li><Link onClick={()=>setIsVisible(!isVisible)} 
              className="py-2 py-2 px-4 block " href={`/shops`}>Shops</Link></li>
              <li className='m-2 p-2'><Logout /></li>
          </ul>
        </div>

      </div>
      </div>
  )
}
