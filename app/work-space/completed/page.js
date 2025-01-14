"use client"
import { BASE, getClientGroupMembers, getClientGroupOrder, getMyRooms, getNewOrderByStatus, getSupplier, updateClientOrder, updateClientOrderGroupStatus, updateGroupOrderStatus } from '@/app/api/api';
import { useAuth } from '@/app/context/authContext';
import { useRoomContext } from '@/app/context/roomContext';
import { getToken } from '@/app/utils/retrieveToken';
import { EditOutlined, ExportOutlined, EyeOutlined, LoadingOutlined, SearchOutlined, SendOutlined, SyncOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons'
import {useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, Input, message, Modal, Radio, Select, Space, Spin, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';


const options = [
    {"value":"pending","label":"Pending"},
    {"value":"active","label":"Active"},
    {"value":"assign to supplier","label":"Assign to supplier"},
    {"value":"on ship","label":"On ship"},
    {"value":"completed","label":"Completed"},
    {"value":"returned","label":"Returned"},
  ]

export default function page() {


    const [messageApi, contextHolder] = message.useMessage();
    const {roomName,setRoomName} = useRoomContext();
    const [open, setOpen] = useState(false);
    const [status,setStatus] = useState(false)
    const [order_id,setOrderId] = useState(false)
    const [order_type,setOrderType] = useState("product")
    const [loading, setLoading] = useState(false);
    const [showMerge,setShowMerge] = useState(false)
    const [orders,setOrders] = useState([])
    const [visibleSupplier,setVisibleSupplier] = useState(false) 
    const [visibleGroup,setVisibleGroup] = useState(false) 
    const [activeGroup,setActiveGroup] = useState()
    // const [value,setValue] = useState()
    const [supplier,setSupplier] = useState()
    
    let token = getToken();
    const {data:new_orders,isLoading:isNewOrderLoading} = useQuery({queryKey:['completed-orders'],queryFn:async ()=> await getNewOrderByStatus({token,status:'completed'}) })
    // const {data:group_orders} = useQuery({queryKey:['group-orders'],queryFn:async ()=> await getClientGroupOrder({token,status:'completed'}) })
    // const {data:group_members} = useQuery({queryKey:['group-members',activeGroup?.id],queryFn:async ()=> await getClientGroupMembers({token,group_id:activeGroup?.id}),enabled:visibleGroup })
    // const {data:suppliers} = useQuery({queryKey:['suppliers'],queryFn:async ()=> await getSupplier(token)})
  

    const queryClient  = useQueryClient();
    const handleCancel = () => {
        setShowMerge(false);
        setOpen(false);
        setVisibleGroup(false)
        setVisibleSupplier(false)
        setLoading(false)
    };

    const handleStatus =(value)=>{
        // setShowMerge(false);
        // alert(value)
    setStatus(value)

    }



    const mutationUpdateGroup = useMutation({mutationFn:updateClientOrderGroupStatus,onSuccess:(data)=>{
      // alert(JSON.stringify(data))
      
      setLoading(false);
      setOpen(false);
      setVisibleSupplier(false)
      setActiveGroup(null)
      queryClient.invalidateQueries("group-orders")
    }})

    const mutation = useMutation({mutationFn:updateClientOrder,onSuccess:(data)=>{
      queryClient.invalidateQueries("active-orders")
      setLoading(false);
      setOpen(false);
      setStatus("")
    }})


    const updateGroupStatusMutation = useMutation({mutationFn:updateGroupOrderStatus,onSuccess:(data)=>{
      queryClient.invalidateQueries("active-orders")
      queryClient.invalidateQueries("group-orders")
      setLoading(false);
      setOpen(false);
      setStatus("")
    }})


    const handleStatusOk = ()=>{
      setLoading(true);
      // let data = {id:order_id.id,client:order_id.client.id,product:order_id.product,status:status,token}
      // mutation.mutate(data)


      if(order_type === "product"){
        let data = {id:order_id.id,client:order_id.client.id,product:order_id.id,status:status,token}
        mutation.mutate(data)
      }else{
        alert(JSON.stringify(activeGroup))
        return;
        // let data = {id:order_id.id,client:order_id.client.id,product:order_id.product,status:status,token}
        updateGroupStatusMutation.mutate(data)
      }


    }

    const handleOk = () => {
        
      if(order_type == "product"){
        let data = {id:order_id.id,client:order_id?.client.id,product:order_id.id,status:status,token}
        mutation.mutate(data)

      }else{
        let data = {id:activeGroup.id,status:status,token}
        updateGroupStatusMutation.mutate(data)
      }



      };


      const handleSupplierOk = () => {
        setLoading(true);

        // let data = {orders:orders,token}
        // alert(JSON.stringify(activeGroup.id))
        // return;

        // setLoading(true);
        let data = {group:activeGroup.id,supplier,token}
        // alert(JSON.stringify(data))
        // return;

        mutationUpdateGroup.mutate(data)

      };

      const onChange = (value)=>{

        // alert(JSON.stringify(value))
        // if(orders.filter(p=>p.id === value.target.value).length === 0){
        //     let data = {id:value.target.value,lag_id:value.target.lag_id}
        //     setOrders(p=>[...p,data])
        // }
        
      }


      const onChangeGroupValue= (val)=>{
        // alert(JSON.stringify(val))
        // if(orders.filter(p=>p.id === value.target.value).length === 0){
            // let data = {id:val.target.value,group:activeGroup.group.id,token}
            // alert(JSON.stringify(data))

        //     setOrders(p=>[...p,data])
        // }
        
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
       title: 'Order ID',
       dataIndex: 'lag_id',
       filterMode: 'tree',
       filterSearch: true,
       width: '20%',
       key:'lag_id',
       render:(text,record)=><span><Tooltip title={`${record.product}`}>{record.lag_id}</Tooltip></span>,
       ...getColumnSearchProps('lag_id')
     },
     {
       title: 'Status',
       dataIndex: 'status',
       key:'status',
       render:(text,record)=><Tag color="green">{record?.status}</Tag>
     },
     {
       title: 'Supplier',
       dataIndex: 'supplier',
       render:(text,record)=><span className='uppercase mx-1 font-bold'>
       {record?.supplier?.name?.length > 10
       ? `${record.supplier.name.slice(0, 10)}...`
       : record?.supplier?.name}
     </span> 
     },
 
     
   
     {
       title: 'Action',
       dataIndex: '',
       key: 'x',
       render: (text,record) => <div>
                           {/* <span className='mx-1 cursor-pointer' onClick={()=>{setVisibleSupplier(true);setActiveGroup(record);}}><Tooltip title="Assign to supplier"><ExportOutlined /></Tooltip></span> */}
                           <span className='mx-1 cursor-pointer' onClick={()=>{setOpen(true);setActiveGroup(record);setOrderType("product")}}><Tooltip title="Update status"><SyncOutlined /></Tooltip></span>
       </div>,
       width: '20%',
     },
   
   ];



  return (
    <div className='min-h-[70vh]'>
        <div className='flex w-full justify-between  items-center'>
            <div className='uppercase'>Completed Orders</div>
            {/* <Button onClick={()=>setShowMerge(!showMerge)}>Merge Orders</Button> */}
      </div>

      <div className='flex flex-col lg:flex-row mt-2 rounded-lg w-full rounded'>
        
                    
                    <div className='relative w-full mt-2 ml-0 lg:mt-0 bg-white rounded-sm'>
                      
                      
                      <div className='lg:px-4 bg-white min-h-[45vh]  w-full max-h-[40vh] lg:max-h-[60vh]'>
                      <ul className='list-none w-full'>

                        <div className='bg-white rounded-md w-full flex items-center justify-center'>
                          {isNewOrderLoading ? <Spin indicator={<LoadingOutlined spin />} size="large" />:
                          <Table className='bg-white mt-2 w-full rounded-md' columns={columns} dataSource={new_orders?.results}  />
                          }
                      </div>

                      </ul>
                      </div>
                      
                    </div>
                </div>





      <Modal
        open={showMerge}
        title="Merge Orders"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Merge
          </Button>,
          
        ]}
      >
       

        <div className='w-full my-2'>
            

            {new_orders?.results?.map((p,idx)=>{
                        return <div className='py-2 border-b border-gray-200' key={p.id}><Checkbox  value={p.id} lag_id={p.lag_id} onChange={onChange}>{p.lag_id}- {p.product}</Checkbox> 
                        </div>
                        // <tr key={idx} className='bg-white border-b border-gray-200 px-2 py-1 m-2 rounded whitespace-normal  w-full ' >
                        //   <td className='p-2 capitalize'>{p.product}</td> 
                        //   <td className='p-2'>{p.status}</td> 
                        //   <td className='p-2'>{p.days}</td> 
                        //   <td className='p-2'>{p.lag_id}</td>
                        //   <td className='p-2'><Button onClick={()=>{setOpen(!open),setOrderId(p)}}>Update</Button></td>
                        //   </tr>;
                      })
                      }

        </div>



      </Modal>




    

      <Modal
        open={visibleGroup}
        title="Members Group"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          
        ]}
      >
       

        <div className='w-full my-2'>
            

            {/* {group_members?.results?.map((p,idx)=>{
                        return <div className='py-2 border-b border-gray-200' key={p.id}> {p.product.lag_id}-{p.product.product}
                        </div>
                       
                      })
                      } */}

        </div>



      </Modal>




      <Modal
        open={visibleSupplier}
        title="Assign Group/order to supplier"
        onOk={handleSupplierOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={()=>handleSupplierOk()}>
            Assign -- 
          </Button>,
          
        ]}
      >
       

        <div className='w-full my-2'>
        <Radio.Group onChange={(e)=>setSupplier(e.target.value)} value={supplier}>

                  {/* {suppliers?.results?.map((p,idx)=>{
                        return(   
                        
                         <div><Radio key={idx} value={p.id}>{p.name}</Radio></div>  
                        )
                      })
                      } */}
    </Radio.Group>


        </div>



      </Modal>



{/* order status */}

      <Modal
        open={open}
        title="Update Order Status"
        onOk={handleStatusOk}
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
