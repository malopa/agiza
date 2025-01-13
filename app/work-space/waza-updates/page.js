"use client"
import { postNotifications } from '@/app/api/api';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'

const data =[
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos ipsum totam soluta alias, perferendis aliquam nesciunt veritatis ipsam eligendi tempora eveniet sequi assumenda consequatur architecto fuga voluptates tenetur dolore minus.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos ipsum totam soluta alias, perferendis aliquam nesciunt veritatis ipsam eligendi tempora eveniet sequi assumenda consequatur architecto fuga voluptates tenetur dolore minus.",
]




export default function page() {

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [title,setTitle] = useState("");
  const [message,setMessage] = useState("");

  const mutation = useMutation({
    mutationFn:postNotifications,
    onSuccess:(data)=>{
      setConfirmLoading(false);

      alert(JSON.stringify(data))
    }
  })

  const showModal = () => {
    setOpen(true);
  };


  const handleOk = () => {
    if(title && message){
      let data = {title,message}
      setConfirmLoading(true);
      mutation.mutate(data)
    }
  };

  


  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  

  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };


  return (
    <div className="min-h-[60vh] px-4">
      <div className="flex items-center justify-between">
        <div className="uppercase">Wazacom Notificatins</div>
        <Button type="primary" onClick={showModal}>Add Notification</Button>
      </div>
        <div className='w-full bg-white mt-2 rounded-md'>
          <ul>
            {data.map((p,idx)=>{
              return <li key={idx} className='border-b p-3 border-gray-150 text-sm'>{p}</li>
            })}
          </ul>
        </div>



        <Modal
        title="Set Notification"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}

      >
        <div className='h-[140px]'>
          {title}
          <Input placeholder="Title" name="title" onChange={(e)=>setTitle(e.target.value)} className='mb-2'/>
          <br />
          <br />
          <TextArea name="message" onChange={(e)=>setMessage(e.target.value)} showCount  maxLength={100} placeholder="notification description" />
        </div>
      </Modal>


    </div>
  )
}
