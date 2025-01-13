"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { SendOutlined, UserOutlined } from '@ant-design/icons'
import { io } from "socket.io-client";
import { useRoomContext } from '../context/roomContext';
import TextArea from 'antd/es/input/TextArea';
import { BASE, getMyRooms, getNewOrder, getNewOrderByStatus, updateClientOrder } from '../api/api';
import { useChatRoomContext } from '../context/cahtRoomContext';
import { useAuth } from '../context/authContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Select, Tag } from 'antd';
import { getToken } from '../utils/retrieveToken';




const options = [
  {"value":"pending","label":"pending"},
  {"value":"active","label":"Active"},
  {"value":"assign to supplier","label":"assign to supplier"},
  {"value":"on ship","label":"on ship"},
  {"value":"completed","label":"completed"},
]

export default function page() {
  const [activeUser,setActiveUser] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const {roomName,setRoomName} = useChatRoomContext();
  const [open, setOpen] = useState(false);
  const [status,setStatus] = useState(false)
  const [order_id,setOrderId] = useState(false)
  const [loading, setLoading] = useState(false);
  

  // let {user} = useAuth()
  let token = getToken()

  const {data:new_orders} = useQuery({queryKey:['new-orders'],queryFn:async ()=> await getNewOrderByStatus({token,status:'pending'}) })

 
  const queryClient = useQueryClient()
  const mutation = useMutation({mutationFn:updateClientOrder,onSuccess:(data)=>{
    alert(JSON.stringify(data))
    setLoading(false);
    setOpen(false);
    setStatus("")
    queryClient.invalidateQueries("new-orders")
  }})

  const handleCancel = () => {
    setOpen(false);
    setLoading(!loading)
  };

  const handleOk = () => {
    setLoading(true);
    let data = {id:order_id.id,client:order_id.client.id,product:order_id.product,status:status,token}
    // alert(JSON.stringify(data))
    // return;
    mutation.mutate(data)
    // setTimeout(() => {
      // setLoading(false);
      // setOpen(false);
    // }, 3000);
  };
  

  const handleStatus =(value)=>{
    setStatus(value)
  }

  return (
    <div>
        <div className='min-h-[60vh] bg-gray-100'>
          <div className=''>
              <div className='w-full  px-4'>
                <div className='flex w-full justify-between  items-center'>
                  <div className='uppercase'>New Orders</div>
                </div>
                <div className='flex flex-col lg:flex-row mt-2 rounded-lg w-full'>
                    {/* <ul className='w-full lg:w-[300px] overflow-y-scroll max-h-[20vh] lg:min-h-[60vh] bg-white'> */}
                      {/* {rooms?.data?.map((p,idx)=>{
                        return <li key={idx} onClick={()=>setRoomName(p.roomName)} className='cursor-pointer rounded-lg flex border-b items-center  border-gray-150 p-2'>
                        <UserOutlined className='gray' /> <div className='ml-2 text-sm capitalize text-gray-500'>{p.roomName}</div>
                        </li>
                      })} */}
                    {/* </ul> */}

                    <div className='w-full mt-2 ml-2 lg:mt-0'>
                      <div className=''>
                        {/* {JSON.stringify(rooms)} */}
                        <div className='px-2 font-bold capitalize'>{roomName}</div>
                        
                        <div className='lg:px-4 bg-white min-h-[45vh] lg:max-h-[60vh] w-full max-h-[60vh] overflow-y-auto' >
                      <ul className='list-none w-full '>
                        <table className='mt-4'>
                          <thead className='bg-gray-200'>
                            <tr className='border-b border-gray-200'>
                              <td className='p-2 '>Product</td>
                              <td className='p-2 '>Status</td>
                              <td className='p-2 '>Days</td>
                              <td className='p-2 '>Id</td>
                              <td className='p-2 '>Action</td>
                            </tr>
                          </thead>
                          <tbody>
                      {new_orders?.results?.map((p,idx)=>{
                        return <tr key={idx} className='bg-white border-b border-gray-200 px-2 py-1 m-2 rounded whitespace-normal  w-full ' >
                          <td className='p-2 capitalize'>{p.product}</td> 
                          <td className='p-2'><Tag color="green"> {p.status} </Tag></td> 
                          <td className='p-2'>{p.days}</td> 
                          <td className='p-2'>{p.lag_id}</td>
                          <td className='p-2'><Button onClick={()=>{setOpen(!open),setOrderId(p)}}>Update</Button></td>
                          </tr>;
                      })
                      }
                      </tbody>
                      </table>

                      </ul>
                      </div>

                      

                        </div>
                    </div>
                </div>
              </div>
          </div>
        </div>



      <Modal
        open={open}
        title="Update Order Status"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
          
        ]}
      >
       

        <div className='w-full my-2'>
            <label className='leading-8'>Update order status</label>
            <Select 
            showSearch
            optionFilterProp="label"
            value={status} name="status" onChange={handleStatus}
            className='w-full' 
            options={options}
            />

        </div>



      </Modal>



    </div>
  )
}
