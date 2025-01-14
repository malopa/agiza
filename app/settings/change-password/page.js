"use client"
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Input, message, Spin, Tooltip } from 'antd'
import React, { useState } from 'react'
import { DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { getToken } from '@/app/utils/retrieveToken'
import { addUsers } from '@/app/api/api'

export default function page() {
  const [messageApi, contextHolder] = message.useMessage();

  const [loading,setLoading] = useState(false)
  const [password,setPassword] = useState()
  const [old_password,setOldPassword] = useState()
  const token = getToken()

  const mutation = useMutation({
    mutationFn:addUsers,onSuccess:(data)=>{
      setPassword("")
      setOldPassword("")
      setLoading(false);
      queryClient.invalidateQueries("users")
      showMessage('Password Changed successfully');

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
    setLoading(true)
    if(password && old_password){
    //   let data = {username:email,first_name,last_name,phone_number,email,token}
    //   mutation.mutate(data)
    }
  }

  return (
        <div className='w-full m-auto bg-gray-100'>
          {contextHolder}
          <div className='flex w-full justify-start'>
            <div className='font-bold uppercase mx-4'>Change Password</div>
          </div>


            <div className='border p-4 lg:m-4 bg-white border-gray-200 rounded-md'>
                <div className='flex w-full mb-4'>
                    <div className='mr-2 w-1/2 '>
                        <label>Old password</label>
                        <Input placeholder='Old passwod' name="old_password" value={old_password} onChange={(e)=>setOldPassword(e.target.value)} />
                    </div>

                    <div className='w-1/2'>
                        <label>New Passwod</label>
                        <Input placeholder='Last Name'  name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>

                </div>

              

                <div className='flex justify-end w-full mb-4'>
                  <Button onClick={()=>saveUser()} loading={loading} type="primary" ghost>Save</Button>
                </div>

            </div>


            
        </div>
  )
}
