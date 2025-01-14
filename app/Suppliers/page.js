"use client"
import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addSupplier, getClients, getSupplier, getUsers } from '../api/api'
import { DeleteOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Space, Spin, Table } from 'antd';
import { getToken } from '../utils/retrieveToken'
import Highlighter from 'react-highlight-words';

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export default function page() {
  let token = getToken();
  const [messageApi, contextHolder] = message.useMessage();

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
      showMessage('Supplier added successfully');

    }
  })



  const showMessage = (msg) => {
    messageApi.open({
      type: 'success',
      content: `${msg}`,
      duration: 10,
    });
  };

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


  const deleteData = ()=>{

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
      title: 'Name',
      dataIndex: 'name',
      filterMode: 'tree',
      filterSearch: true,
      width: '30%',
      key:'id',
      ...getColumnSearchProps('name'),
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



  return (
    <div>
      <Header />

      {contextHolder}


      <div className='min-h-[80vh] bg-gray-100 '>
        <div className='w-full p-2  mt-8 lg:w-3/4 m-auto  ' >
        <div className='flex justify-between items-center bg-white my-4 px-2 rounded-md'>
          <div className='font-bold my-4  uppercase'>Suppliers</div>
            <Button onClick={showModal}>Register Supplier</Button>
          </div>
          <div className='w-full flex bg-white p-2 items-center justify-center rounded-md'>
            {isLoading ? <Spin indicator={<LoadingOutlined spin />} size="large" />:
              <Table className='bg-white w-full' columns={columns} dataSource={users?.results} onChange={onChange} />
              }
          </div>
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
