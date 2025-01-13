"use client"
import React, { useState } from 'react'
import Header from '../components/Header'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addSupplier, getClients, getSupplier, getUsers } from '../api/api'
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Spin, Table } from 'antd';
import { getToken } from '../utils/retrieveToken'


const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export default function page() {
  let token = getToken();
  const {data:users,isLoading} = useQuery({queryKey:['suppliers'],queryFn:async ()=>await getSupplier(token)})
  const [name,setName] = useState("")
  const [phone_number,setPhoneNumber] = useState("")

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };


  const queryClient  = useQueryClient();
  const mutation = useMutation({
    mutationFn:addSupplier,onSuccess:(data)=>{
        queryClient.invalidateQueries("suppliers")
        setLoading(false);
        setOpen(false);
        setPhoneNumber("")
        setName("")
    }
  })
  const handleOk = () => {
    setLoading(true);
    let data = {phone_number,name,token}
    mutation.mutate(data)

    // setTimeout(() => {
    //   setLoading(false);
    //   setOpen(false);
    // }, 3000);

  };

  const handleCancel = () => {
    setOpen(false);
  };


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filterMode: 'tree',
      filterSearch: true,
      width: '30%',
      key:'id'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key:'phone'
    },
  
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a onClick={()=>deleteData()}><DeleteOutlined className='text-red-400' /></a>,
      width: '10%',
    },
  
  ];

  const deleteData = ()=>{

  }

  return (
    <div>
      <Header />
      <div className='min-h-[80vh] mt-4'>
        <div className='w-full p-2 lg:w-3/4 m-auto bg-white ' >
        <div className='flex justify-between items-center my-4-'>
          <div className='font-bold my-4  uppercase'>Suppliers</div>
          <Button onClick={showModal}>Register Supplier</Button>
        </div>
          {isLoading ? <Spin indicator={<LoadingOutlined spin />} size="large" />:
          <Table className='bg-white' columns={columns} dataSource={users?.results} onChange={onChange} />
          }
        </div>
      </div>



      <Modal
        open={open}
        title="Register Client"
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
            <label className='leading-8'>Name</label>
            <Input placeholder="Full name"
             name="name" value={name} onChange={(e)=>setName(e.target.value)}
            />
        </div>

        <div className='w-full my-2'>
            <label className='leading-8'>Phone Number</label>
            <Input placeholder="Phone name" value={phone_number} name="phone_number" onChange={(e)=>setPhoneNumber(e.target.value)}  />
        </div>

        {/* <div className='w-full my-2'>
            <label className='leading-8'>Address</label>
            <Input name="location"  placeholder="client address" />
        </div> */}
        

      </Modal>

    </div>
  )
}
