"use client"
import React from 'react'
import Header from '../components/Header'
import { useQuery } from '@tanstack/react-query';
import { getShop } from '../api/api';
import { Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';




const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};



export default function page() {

  const {data,isLoading} = useQuery({queryKey:['shops'],queryFn:async ()=> await getShop()})

  const columns = [
    {
      title: 'Name',
      dataIndex: 'businessName',
      filterMode: 'tree',
      filterSearch: true,
      width: '30%',
      key: '_id',
    },
    {
      title: 'Owner',
      dataIndex: ["user", "first_name"],
      key:'first_name'
    },
    {
      title: 'Phone Number',
      dataIndex: ["user", "phone"],
      key:'phone'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a onClick={()=>deleteData()}>Delete</a>,
      width: '10%',
    },
  
  ];

  return (
    <div>
        <Header />
        <div className='min-h-[90vh]'>
            <div className='w-full p-2 lg:w-3/4 m-auto'>
                <div className='py-4 font-bold uppercase'>Shops</div>
                {isLoading? <Spin indicator={<LoadingOutlined spin />} size="large" />:
                <Table columns={columns} dataSource={data?.data} onChange={onChange} />
              }

            </div>
        </div>
    </div>
  )
}
