"use client"
import { Input } from 'antd'
import React from 'react'

export default function page() {
  return (
        <div className='w-full m-auto bg-gray-100'>
          <div className='flex w-full justify-end'>
            <div className='font-bold uppercase my-4'>Staff Member</div>
          </div>


            <div className='border bg-white border-gray-200 rounded-md'>
                <div className='flex p-4'>
                    <div>
                        <label>First Name</label>
                        <Input placeholder='First Name' />
                    </div>

                    <div>
                        <label>Last Name</label>
                        <Input placeholder='Last Name' />
                    </div>

                </div>

                <div className='flex'>
                    <div>
                        <label>Email  Address</label>
                        <Input placeholder='Email Address' />
                    </div>

                    <div>
                        <label>Phone Number Name</label>
                        <Input placeholder='Phone Number' />
                    </div>

                </div>

            </div>
        </div>
  )
}
