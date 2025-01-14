"use client"
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Input, message, Spin, Tooltip } from 'antd'
import React, { useState } from 'react'
import { addUsers, getUsers } from '../api/api'
import { getToken } from '../utils/retrieveToken'
import { DeleteOutlined, UserOutlined } from '@ant-design/icons'

export default function page() {
  const [messageApi, contextHolder] = message.useMessage();

  const [loading,setLoading] = useState(false)
  const [first_name,setFirstName] = useState()
  const [last_name,setLastName] = useState()
  const [email,setEmail] = useState()
  const [phone_number,setPhoneNumber] = useState()
  const token = getToken()
  const {data:users,isLoading} = useQuery({queryKey:['users'],queryFn:async ()=>await getUsers(token)})

  const mutation = useMutation({
    mutationFn:addUsers,onSuccess:(data)=>{
      setFirstName("")
      setLastName("")
      setPhoneNumber("")
      setEmail("")
      setLoading(false);
      queryClient.invalidateQueries("users")

      showMessage('Client added successfully');

    }
  })


  const showMessage = (msg) => {
    messageApi.open({
      type: 'success',
      content: `${msg}`,
      duration: 10,
    });
  };




  const saveUser = ()=>{
    if(first_name && last_name && phone_number && email){
      setLoading(true)
      let data = {username:email,first_name,last_name,phone_number,email,token}
      mutation.mutate(data)
    }
  }

  return (
        <div className='w-full m-auto bg-gray-100'>
          {contextHolder}
          <div className='flex w-full justify-start'>
            <div className='font-bold uppercase mx-4'>Staff Member</div>
          </div>


            <div className='border p-4 lg:m-4 bg-white border-gray-200 rounded-md'>
                <div className='flex w-full mb-4'>
                    <div className='mr-2 w-1/2 '>
                        <label>First Name</label>
                        <Input placeholder='First Name' name="first_name" value={first_name} onChange={(e)=>setFirstName(e.target.value)} />
                    </div>

                    <div className='w-1/2'>
                        <label>Last Name</label>
                        <Input placeholder='Last Name'  name="last_name" value={last_name} onChange={(e)=>setLastName(e.target.value)} />
                    </div>

                </div>

                <div className='flex w-full mb-4'>
                    <div className='mr-2 w-1/2'>
                        <label>Email  Address</label>
                        <Input placeholder='Email Address' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>

                    <div className='w-1/2'>
                        <label>Phone Number</label>
                        <Input placeholder='Phone Number' name="phone_number" value={phone_number} onChange={(e)=>setPhoneNumber(e.target.value)} />
                    </div>

                </div>

                <div className='flex justify-end w-full mb-4'>
                  <Button onClick={()=>saveUser()} loading={loading} type="primary" ghost>Save</Button>
                </div>

            </div>


            <div className='border lg:m-4 bg-white border-gray-200 rounded-md'>
              <div className='font-bold border-b border-gray-200 p-2'>Team Members</div>
              <div className='p-4 flex flex-col'>
                {isLoading?<Spin />:users?.results?.map(p=>{
                  return <div className='w-full p-2 border-b flex justify-between'>
                      <div className='flex'>
                        <div className='mr-2'><UserOutlined /></div>
                        <div className='flex flex-col'>
                          <div className='font-bold text-sm'>{p.first_name}</div>
                          <div className='text-sm'>{p.email}</div>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <div className='mr-4'>Role</div>
                        <div className='text-red'><Tooltip title="Delete member"><DeleteOutlined/></Tooltip></div>
                      </div>
                    </div>
                })}
              </div>
            </div>
        </div>
  )
}
