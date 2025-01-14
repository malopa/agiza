"use client"
import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import { LoadingOutlined, SearchOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import { io } from "socket.io-client";
import { useRoomContext } from '../context/roomContext';
import TextArea from 'antd/es/input/TextArea';
import { BASE, getMyRooms, getNewOrder, getNewOrderByStatus, updateClientOrder } from '../api/api';
import { useChatRoomContext } from '../context/cahtRoomContext';
import { useAuth } from '../context/authContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, message, Modal, Select, Space, Spin, Table, Tag } from 'antd';
import { getToken } from '../utils/retrieveToken';
import Highlighter from 'react-highlight-words';




const options = [
  {"value":"pending","label":"pending"},
  {"value":"active","label":"Active"},
  // {"value":"assign to supplier","label":"assign to supplier"},
  // {"value":"on ship","label":"on ship"},
  // {"value":"completed","label":"completed"},
]

export default function page() {
  const [open, setOpen] = useState(false);
  const [status,setStatus] = useState(false)
  const [order_id,setOrderId] = useState(false)
  const [loading, setLoading] = useState(false);
  
  const [messageApi, contextHolder] = message.useMessage();

  let token = getToken()

  const {data:new_orders,isLoading} = useQuery({queryKey:['new-orders'],queryFn:async ()=> await getNewOrderByStatus({token,status:'pending'}) })

 
  const queryClient = useQueryClient()
  const mutation = useMutation({mutationFn:updateClientOrder,onSuccess:(data)=>{
    // alert(JSON.stringify(data))

    setLoading(false);
    setOpen(false);
    setStatus("")
    queryClient.invalidateQueries("new-orders")
    showMessage('Status updated successfully');

  }})

  const handleCancel = () => {
    setOpen(false);
    setLoading(!loading)
  };


  const showMessage = (msg) => {
    messageApi.open({
      type: 'success',
      content: `${msg}`,
      duration: 10,
    });
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





  // table search 
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  // end table search 

  const columns = [
    {
      title: 'Order',
      dataIndex: 'product',
      filterMode: 'tree',
      filterSearch: true,
      width: '30%',
      key:'id',
      ...getColumnSearchProps('product')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key:'status',
    },
    {
      title: 'Days',
      dataIndex: 'days',
    },
    {
      title: 'Order ID',
      dataIndex: 'lag_id',
      key:"lag_id",
      ...getColumnSearchProps('lag_id')

    },
  
    // {
    //   title: 'Action',
    //   render: (region) => (
    //     <a className='border border-gray-200'  key={region.id} onClick={() => {setOpenLaguage(!openLaguage);setClientId(region.id)}}>
    //       {(region.name)}
    //     </a>
    //   ),
    // },
  
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text,record) => <Button onClick={()=>{setOpen(!open),setOrderId(record)}}>Update</Button>,
      width: '10%',
    },
  
  ];


  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  


  return (
    <div>
      {contextHolder} 
        <div className='min-h-[70vh] bg-gray-100'>
          <div className=''>
              <div className='w-full px-0'>
                <div className='flex w-full justify-between  items-center'>
                  <div className='uppercase'>New Orders</div>
                </div>
                <div className='flex flex-col lg:flex-row mt-2 rounded-lg w-full'>
                    

                    <div className='w-full mt-2 ml-0 rounded-md  lg:mt-0'>
                      <div className='w-full'>
                        
                        <div className='lg:px-4 bg-white min-h-[45vh] lg:max-h-[60vh] w-full max-h-[60vh] overflow-y-auto' >
                      <ul className='list-none w-full '>

                      <div className='bg-white rounded-md w-full flex items-center justify-center'>
                          {isLoading ? <Spin indicator={<LoadingOutlined spin />} size="large" />:
                          <Table className='bg-white mt-2 w-full rounded-md' columns={columns} dataSource={new_orders?.results} onChange={onChange} />
                          }
                      </div>


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
