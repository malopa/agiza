"use client"
import { BASE, getClientGroupMembers, getClientGroupOrder, getMyRooms, getNewOrderByStatus, getSupplier, updateClientOrder, updateClientOrderGroupStatus } from '@/app/api/api';
import { useAuth } from '@/app/context/authContext';
import { useRoomContext } from '@/app/context/roomContext';
import { getToken } from '@/app/utils/retrieveToken';
import { EditOutlined, ExportOutlined, EyeOutlined, SendOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons'
import {useMutation, useQuery } from '@tanstack/react-query';
import { Button, Checkbox, Modal, Radio, Select, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react'


const options = [
    {"value":"pending","label":"pending"},
    {"value":"active","label":"Active"},
    {"value":"assign to supplier","label":"assign to supplier"},
    {"value":"on ship","label":"on ship"},
  ]

export default function page() {

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
    const {data:new_orders} = useQuery({queryKey:['active-orders'],queryFn:async ()=> await getNewOrderByStatus({token,status:'active'}) })
    const {data:group_orders} = useQuery({queryKey:['group-orders'],queryFn:async ()=> await getClientGroupOrder({token}) })
    const {data:group_members} = useQuery({queryKey:['group-members',activeGroup?.group?.id],queryFn:async ()=> await getClientGroupMembers({token,group_id:activeGroup?.group?.id}),enabled:visibleGroup })
    const {data:suppliers} = useQuery({queryKey:['suppliers',activeGroup?.group?.id],queryFn:async ()=> await getSupplier(token)})
  

    const handleCancel = () => {
        setShowMerge(false);
        setOpen(false);
        setVisibleGroup(false)
        setVisibleSupplier(false)
        setLoading(false)
    };

    const handleStatus =(value)=>{
        setShowMerge(false);
    }



    const mutationUpdateGroup = useMutation({mutationFn:updateClientOrderGroupStatus,onSuccess:(data)=>{
      alert(JSON.stringify(data))
      setLoading(false);
      setOpen(false);
      setStatus("")
      queryClient.invalidateQueries("new-orders")
    }})

    const mutation = useMutation({mutationFn:updateClientOrder,onSuccess:(data)=>{
      alert(JSON.stringify(data))
      setLoading(false);
      setOpen(false);
      setStatus("")
      queryClient.invalidateQueries("new-orders")
    }})

    const handleStatusOk = ()=>{
      setLoading(true);
      let data = {id:order_id.id,client:order_id.client.id,product:order_id.product,status:status,token}
      mutation.mutate(data)
    }

    const handleOk = () => {
        // setLoading(true);

        let data = {orders:orders,token}
        alert(JSON.stringify(data))
        return;
        // mutation.mutate(data)
        // setTimeout(() => {
        //   setLoading(false);
        //   setShowMerge(false);
        // }, 3000);

      };


      const handleSupplierOk = () => {
        setLoading(true);

        // let data = {orders:orders,token}
        alert(JSON.stringify(activeGroup.group.id))
        // return;

        // setLoading(true);
        let data = {id:activeGroup.group.id,supplier,token}
        mutationUpdateGroup.mutate(data)

      };

      const onChange = (value)=>{

        alert(JSON.stringify(value))
        // if(orders.filter(p=>p.id === value.target.value).length === 0){
        //     let data = {id:value.target.value,lag_id:value.target.lag_id}
        //     setOrders(p=>[...p,data])
        // }
        
      }


      const onChangeGroupValue= (val)=>{
        alert(JSON.stringify(val))
        // if(orders.filter(p=>p.id === value.target.value).length === 0){
            // let data = {id:val.target.value,group:activeGroup.group.id,token}
            // alert(JSON.stringify(data))

        //     setOrders(p=>[...p,data])
        // }
        
      }

  return (
    <div className='min-h-[70vh] px-4'>
        <div className='flex w-full justify-between  items-center'>
            <div className='uppercase'>Active Orders</div>
            <Button onClick={()=>setShowMerge(!showMerge)}>Merge Orders</Button>
      </div>

      <div className='flex flex-col lg:flex-row mt-2 rounded-lg w-full'>
        
                    <ul className='w-full lg:w-[600px] overflow-y-scroll max-h-[20vh] lg:min-h-[60vh] bg-white'>
                        <div className='uppercase font-bold p-2'>Package Orders</div>
                        {/* {JSON.stringify(group_orders)} */}
                      {group_orders?.results?.map((p,idx)=>{
                        return <li key={idx} onClick={()=>setRoomName(p.group_id)} className='cursor-pointer rounded-lg flex border-b items-center  border-gray-150 p-2'>
                        <UsergroupAddOutlined /> <div className='ml-2 text-sm capitalize text-gray-500'><span className='font-bold'>{p?.group_id}</span> <span className='bg-green-400 rounded-md px-2'>{p?.status}   </span> <span className='uppercase'>{p?.supplier?.name}</span> <span className='mx-2 py-1 cursor-pointer' onClick={()=>{setVisibleGroup(!visibleGroup);setActiveGroup(p);}}><Tooltip title="View product"><EyeOutlined /></Tooltip></span> <span className='mx-2 cursor-pointer' onClick={()=>{setVisibleSupplier(!visibleSupplier);setActiveGroup(p);}}><Tooltip title="Assign to supplier"><ExportOutlined /></Tooltip></span></div>
                        </li>
                      })}
                    </ul>
                    <div className='relative w-full mt-2 ml-2 lg:mt-0 bg-white'>
                      <div className='px-2 font-bold capitalize'>
                      {roomName}</div>
                      
                      <div className='lg:px-4 bg-white min-h-[45vh] lg:min-h-[60vh] w-full max-h-[40vh] lg:max-h-[60vh]'>
                      <ul className='list-none w-full'>
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
                          <td className='p-2'>{p.status}</td> 
                          <td className='p-2'>{p.days}</td> 
                          <td className='p-2'>{p.lag_id}</td>
                          <td className='p-2'><Button onClick={()=>{setOpen(!open),setOrderId(p);setOrderType("product")}}><Tooltip title="Update order status"><EditOutlined /> </Tooltip></Button></td>
                          </tr>;
                      })
                      }
                      </tbody>
                      </table>
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
            

            {group_members?.results?.map((p,idx)=>{
                        return <div className='py-2 border-b border-gray-200' key={p.id}> {p.product.lag_id}-{p.product.product}
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

                  {suppliers?.results?.map((p,idx)=>{
                        return(   
                        // <div className='py-2 border-b border-gray-200' key={p.id}><Checkbox  value={p.id} onChange={(e)=>setSupplier(e.target.value)}>{p.name}</Checkbox> 
                        // </div>
                         <div><Radio key={idx} value={p.id}>{p.name}</Radio></div>  
                        )
                      })
                      }
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
