"use client"
import { BASE, getMyRooms } from '@/app/api/api';
import { useAuth } from '@/app/context/authContext';
import { useRoomContext } from '@/app/context/roomContext';
import { SendOutlined, UserOutlined } from '@ant-design/icons'
import {useQuery } from '@tanstack/react-query';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react'


const users = [
  "juma hamisi",
  "ally kagasheki",
  "peter james"
]

export default function page() {

  const [activeUser,setActiveUser] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const {roomName,setRoomName} = useRoomContext();
  // const [sender, setUser_id] = useState("65ace78b37a35b3858e6dfcb");
  let {user} = useAuth()

  
  const {data:rooms} = useQuery({queryKey:['rooms',user?.id],queryFn:async ()=> await getMyRooms(user?.id) })

  useEffect(() => {
  }, [roomName]); // Reconnect to the server if the room changes


  useEffect(() => {

  }, [roomName]);


  const sendMessage = () => {
  };


  return (
    <div className='min-h-[70vh] px-4'>
      <div className='uppercase'>Returned Orders</div>
      <div className='flex flex-col lg:flex-row mt-2 rounded-lg w-full'>
                    <ul className='w-full lg:w-[300px] overflow-y-scroll max-h-[20vh] lg:min-h-[60vh] bg-white'>
                      {rooms?.data?.map((p,idx)=>{
                        return <li key={idx} onClick={()=>setRoomName(p.roomName)} className='cursor-pointer rounded-lg flex border-b items-center  border-gray-150 p-2'>
                        <UserOutlined className='gray' /> <div className='ml-2 text-sm capitalize text-gray-500'>{p.roomName}</div>
                        </li>
                      })}
                    </ul>
                    <div className='relative w-full mt-2 ml-2 lg:mt-0 bg-white'>
                      <div className='px-2 font-bold capitalize'>
                      {roomName}</div>
                      
                      <div className='lg:px-4 bg-white min-h-[45vh] lg:min-h-[60vh] w-full max-h-[40vh] lg:max-h-[70vh]'>
                      <ul className='list-none w-full'>
                      {messages.map((p,idx)=>{
                          return <li key={idx} className='bg-white px-2 py-1 rounded whitespace-normal max-w-md' >{p.message}</li>

                        })

                        
                        }
                      </ul>
                      </div>
                      
                    </div>
                </div>
    </div>
  )
}
