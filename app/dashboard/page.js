"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useQuery } from '@tanstack/react-query'
import { getBusinesVirstual, getShop, getUsers, getUserVirstual } from '../api/api'
import { Chart } from "react-google-charts";
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useAuth } from '../context/authContext'
import { getToken } from '../utils/retrieveToken'




// Material chart options
const options = {
  chart: {
    title: "App Performance",
    subtitle: "Users and Business over the Year",
  },
};



export default function page() {

  let token = getToken()
  const {data:users} = useQuery({queryKey:['users'],queryFn:async ()=>await getUsers(token)})
  // const {data:shops} = useQuery({queryKey:['shops'],queryFn:async ()=> await getShop()})
  // const {data:uvisual,isLoading:isUserLoading} = useQuery({queryKey:['user-visual'],queryFn:async ()=> await getUserVirstual()})
  // const {data:bvisual,isLoading:isVisualLoading} = useQuery({queryKey:['busines-visual'],queryFn:async ()=> await getBusinesVirstual()})
  const [data,setData] = useState([
    ["Month", "Users", "Business"],
  ]);

  
  // alert(JSON.stringify(token))


  function getTotalBusinessByMonth(year, month) {
    const result = bvisual?.data.find(
      (item) => item._id.year === year && item._id.month === month
    );
    return result ? result.totalBusiness : 0;
  }

  function getTotalUsersByMonth(year, month) {
    const result = uvisual?.data.find(
      (item) => item._id.year === year && item._id.month === month
    );
    return result ? result.totalUsers : 0;
  }


  // useEffect(()=>{
    
  //   if(uvisual?.data || bvisual?.data){
  //     // let d = data[0];
  //     // setData(d)
  //     for(let i=1; i<=12;++i){
  //         let d = [`${i}`,getTotalBusinessByMonth(2024, i),getTotalUsersByMonth(2024, i)]
  //         if(data.length <=13){
  //           setData(p=>[...p,d])
  //         }
  //     }
  //   }

  // },[isVisualLoading,isUserLoading])

  return (
    <div className='w-full'>
      <Header />
      <div className='min-h-[84vh] bg-gray-100'>

          <div className='flex flex-col lg:flex-row w-full cursor-pointer m-auto lg:w-3/4 h-32 origin-center hover:scale-1' >

            <div className='shadow-md bg-white w-[300px] p-3 m-4 rounded-md'>
              <div className='border-b border-b-1 py-2'>Total Clients:</div>
              <div className='my-2 flex justify-end w-full'>{users?.results?.length}</div>
            </div>

            <div className='shadow-md cursor-pointer bg-white w-[300px] p-3 m-4 rounded-md'>
              <div className='border-b border-b-1 py-2'>Total completed Orders:</div>
              <div className='my-2 flex justify-end w-full'>100</div>
            </div>

            <div className='shadow-md cursor-pointer bg-white w-[300px] p-3 m-4 rounded-md'>
              <div className='border-b border-b-1 py-2'>Pending Orders:</div>
              <div className='my-2 flex justify-end w-full'>100</div>
            </div>

            <div className='shadow-md cursor-pointer bg-white w-[300px] p-3 m-4 rounded-md'>
              <div className='border-b border-b-1 py-2'>On Progress:</div>
              <div className='my-2 flex justify-end w-full'>100</div>
            </div>


          </div>


          <br />  
          <br />  
          <br />  

          <div className='m-auto lg:w-3/4 text-xl font-bold'>Daily Statistics</div>
          <div className='flex flex-col lg:flex-row w-full cursor-pointer m-auto lg:w-3/4 h-32 origin-center hover:scale-1' >

            <div className='shadow-md bg-white w-[300px] p-3 m-4 rounded-md'>
              <div className='border-b border-b-1 py-2'>Total Placed order:</div>
              <div className='my-2 flex justify-end w-full'>{users?.results?.length}</div>
            </div>

            <div className='shadow-md cursor-pointer bg-white w-[300px] p-3 m-4 rounded-md'>
              <div className='border-b border-b-1 py-2'>Total Completed order:</div>
              <div className='my-2 flex justify-end w-full'>100</div>
            </div>

            <div className='shadow-md cursor-pointer bg-white w-[300px] p-3 m-4 rounded-md'>
              <div className='border-b border-b-1 py-2'>Pending Orders:</div>
              <div className='my-2 flex justify-end w-full'>100</div>
            </div>

            <div className='shadow-md cursor-pointer bg-white w-[300px] p-3 m-4 rounded-md'>
              <div className='border-b border-b-1 py-2'>On Progress:</div>
              <div className='my-2 flex justify-end w-full'>100</div>
            </div>


          </div>

          <br />  
          <br />  
          
      </div>
    </div>
  )
}
