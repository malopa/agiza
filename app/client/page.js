"use client"
import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addClientOrder, addClients, getClients, getRegions, getUsers } from '../api/api'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Select, Space, Spin, Table } from 'antd';
import { getToken } from '../utils/retrieveToken'
import Highlighter from 'react-highlight-words'


const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};


const order_types = [
  {"value":"Buy for me","label":"Buy for me"},
  {"value":"Deliver for me","label":"Deliver for me"},
]

export default function page() {
  let token = getToken();

  
  const {data:users,isLoading} = useQuery({queryKey:['clients'],queryFn:async ()=>await getClients(token)})
  const {data:regions} = useQuery({queryKey:['regions'],queryFn:async ()=>await getRegions(token)})
  // alert(JSON.stringify(regions))
  const [messageApi, contextHolder] = message.useMessage();
  const [name,setName] = useState("")
  const [phone_number,setPhoneNumber] = useState("")
  const [region,setRegion] = useState("")
  const [location,setLocation] = useState("")
  const [options,setOption] = useState([])

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openLaguage, setOpenLaguage] = useState(false);

  const [product,setProduct] = useState();
  const [order_type,setOrderType] = useState("");
  const [days,setDays] = useState("");
  const [client_id,setClientId] = useState(null);

  const queryClient = useQueryClient();
  const showModal = () => {
    setOpen(true);
  };

  useEffect(()=>{
    regions?.results?.map(p=>{
      let d = {label:p.name,value:p.id}
      setOption(p=>[...p,d])
    })
  },[regions])


  const mutation = useMutation({
    mutationFn:addClients,onSuccess:(data)=>{
      setName("")
      setPhoneNumber("")
      setLocation("")
      setRegion("")
      setLoading(false);
      setOpen(false);
      queryClient.invalidateQueries("clients")

      showMessage('Client added successfully');

    }
  })
  const handleOk = () => {
    setLoading(true);
    let data = {name,region,location,phone_number,token}
    mutation.mutate(data)
    // setTimeout(() => {
    //   setLoading(false);
    //   setOpen(false);
    // }, 3000);
  };



  const orderMutation = useMutation({
    mutationFn:addClientOrder,onSuccess:(data)=>{
      // messageApi.info('Added successfully!');
      setProduct("")
      setOrderType("")
      setDays("")
      setLoading(false);
      setOpenLaguage(false);
      queryClient.invalidateQueries("new-orders")

      showMessage('Order added successfully');


    }
  })


  const showMessage = (msg) => {
    messageApi.open({
      type: 'success',
      content: `${msg}`,
      duration: 10,
    });
  };


  const handleOrderOk = () => {
    setLoading(true);
    let data = {client:client_id,product,days:days,order_type,token}
    // alert(JSON.stringify(data))
    orderMutation.mutate(data)
   
  };

  const handleCancel = () => {
    setOpen(false);
    setLoading(false);
  };


  const handleOrderCancel = () => {
    setOpenLaguage(false);
    setLoading(false);
  };


  

  const deleteData = ()=>{

  }


  const handleRegion =(value)=>{
    setRegion(value)
  }


  const handleOrderType =(value)=>{
    setOrderType(value)
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
      ...getColumnSearchProps('name')
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key:'phone_number',
      ...getColumnSearchProps('phone_number')
    },
    {
      title: 'Address',
      dataIndex: 'location',
    },
    {
      title: 'Registration Date',
      dataIndex: 'created_at',
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key:'region',
      render: (region) => (
        <a className='border border-gray-200'  key={region.id} onClick={() => {setOpenLaguage(!openLaguage);setClientId(region.id)}}>
          {(region.name)}
        </a>
      ),
    },
  
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text,record) => <a key={record.id} onClick={() => {setOpenLaguage(!openLaguage);setClientId(record.id)}}>Add Order</a>,
      width: '10%',
    },
  
  ];


  return (
    <div>
      <Header />

      {contextHolder}

      <div className='min-h-[80vh] mt-4 bg-gray-100'>
        <div className='w-full p-2 lg:w-3/4 m-auto ' >
          <div className='flex justify-between bg-white px-2 rounded-md items-center my-4'>
            <div className='font-bold my-4   uppercase'>Clients</div>
              <Button onClick={showModal}>Register Client</Button>
          </div>
          <div className='bg-white rounded-md w-full'>
              {isLoading ? <Spin indicator={<LoadingOutlined spin />} size="large" />:
              <Table className='bg-white w-full rounded-md' columns={columns} dataSource={users?.results} onChange={onChange} />
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
            <label className='leading-8'>Product</label>
            <Input placeholder="Full Name" 
              name="name" value={name} 
              onChange={(e)=>setName(e.target.value)}
              required
            />
        </div>


        <div className='w-full my-2'>
            <label className='leading-8'>Phone Number</label>
            <Input placeholder="Phone Number" 
              name="phone_number" value={phone_number} 
              onChange={(e)=>setPhoneNumber(e.target.value)}
              required

            />
        </div>

        <div className='w-full my-2'>
            <label className='leading-8'>Region</label>
            <Select 
            showSearch
            optionFilterProp="label"
            value={region} name="region" onChange={handleRegion}
            className='w-full' 
            options={options}
            />

              {/* <Select.Option value="">Select Region</Select.Option>
              {regions?.results.map(p=>{
                return <Select.Option value={p.id}>{p.name}</Select.Option>
              })}
            </Select> */}
        </div>


        <div className='w-full my-2'>
            <label className='leading-8'>Address</label>
            <Input placeholder="Enter Client address" 
              required
            value={location} name="location" onChange={(e)=>setLocation(e.target.value)} />
        </div>


      </Modal>



      <Modal
        open={openLaguage}
        title="Add Order"
        onOk={handleOrderOk}
        onCancel={handleOrderCancel}
        footer={[
          <Button key="back" onClick={handleOrderCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOrderOk}>
            Submit
          </Button>,
          
        ]}
      >
        <div className='w-full my-2'>
            <label className='leading-8'>Product Name</label>
            <Input placeholder="Product name" 
              name="product" value={product} onChange={(e)=>setProduct(e.target.value)}
              required
            />
        </div>


        <div className='w-full my-2'>
            <label className='leading-8'>Order Type</label>
            <Select 
            showSearch
            optionFilterProp="label"
            value={order_type} name="region" onChange={handleOrderType}
            className='w-full' 
            options={order_types}
            />
        </div>

        <div className='w-full my-2'>
            <label className='leading-8'>Days to delivery</label>
            <Input placeholder="Days" 
              name="days" value={days} 
              onChange={(e)=>setDays(e.target.value)}
              required

            />

            

              {/* <Select.Option value="">Select Region</Select.Option>
              {regions?.results.map(p=>{
                return <Select.Option value={p.id}>{p.name}</Select.Option>
              })}
            </Select> */}
        </div>


        {/* <div className='w-full my-2'>
            <label className='leading-8'>Address</label>
            <Input placeholder="Enter Client address" 
              required
            value={location} name="location" onChange={(e)=>setLocation(e.target.value)} />
        </div> */}


      </Modal>


    </div>
  )
}
