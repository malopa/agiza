"use client"
import React from 'react'
import Header from '../components/Header'

export default function page() {
  return (
    <div>
        <Header />
        <div className='min-h-[90vh] w-3/4 m-auto bg-gray-100'>
            <div className='font-bold uppercase my-4'>Notifications</div>
        </div>
    </div>
  )
}
