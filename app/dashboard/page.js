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
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);



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


  const dailyData = {
    labels: ['Completed', 'Pending', 'In Progress'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  const monthlyData = {
    labels: ['Completed', 'Pending', 'In Progress'],
    datasets: [
      {
        data: [120, 70, 40],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };




  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header />
      <div className="min-h-[63vh] p-6"> {/* Reduced the height */}
        {/* Dashboard Overview */}
        <div className="text-center text-2xl font-bold mb-8">Dashboard Overview</div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:w-3/4 mx-auto">
          {/* Total Clients */}
          <div className="shadow-md bg-white p-4 rounded-lg transition-transform transform hover:scale-105">
            <div className="text-gray-600 font-semibold border-b pb-2 mb-2">Total Clients</div>
            <div className="text-right text-xl font-bold text-blue-600">{users?.results?.length}</div>
          </div>

          {/* Total Completed Orders */}
          <div className="shadow-md bg-white p-4 rounded-lg transition-transform transform hover:scale-105">
            <div className="text-gray-600 font-semibold border-b pb-2 mb-2">Total Completed Orders</div>
            <div className="text-right text-xl font-bold text-green-600">100</div>
          </div>

          {/* Pending Orders */}
          <div className="shadow-md bg-white p-4 rounded-lg transition-transform transform hover:scale-105">
            <div className="text-gray-600 font-semibold border-b pb-2 mb-2">Pending Orders</div>
            <div className="text-right text-xl font-bold text-orange-500">100</div>
          </div>

          {/* On Progress */}
          <div className="shadow-md bg-white p-4 rounded-lg transition-transform transform hover:scale-105">
            <div className="text-gray-600 font-semibold border-b pb-2 mb-2">On Progress</div>
            <div className="text-right text-xl font-bold text-yellow-500">100</div>
          </div>
        </div>

        {/* Daily Statistics */}
        <div className="text-center text-2xl font-bold my-12">Daily Statistics</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:w-3/4 mx-auto">
          {/* Daily Pie Chart */}
          <div className="shadow-md bg-white p-4 rounded-lg">
            <div className="text-center text-xl font-semibold mb-4">Daily Orders</div>
            <Pie data={dailyData} height={100}/>
          </div>

          {/* Monthly Pie Chart */}
          <div className="shadow-md bg-white p-4 rounded-lg">
            <div className="text-center text-xl font-semibold mb-4">Monthly Orders</div>
            <Pie data={monthlyData} height={100} />
          </div>
        </div>

        {/* Other sections */}
        <div className="m-auto lg:w-3/4 text-xl font-bold">More Stats</div>
        <div className="flex flex-col lg:flex-row w-full cursor-pointer m-auto lg:w-3/4 h-32 origin-center hover:scale-1">
          <div className="shadow-md bg-white w-[300px] p-3 m-4 rounded-md">
            <div className="border-b border-b-1 py-2">Total Placed Orders</div>
            <div className="my-2 flex justify-end w-full">{users?.results?.length}</div>
          </div>

          <div className="shadow-md cursor-pointer bg-white w-[300px] p-3 m-4 rounded-md">
            <div className="border-b border-b-1 py-2">Total Completed Orders</div>
            <div className="my-2 flex justify-end w-full">100</div>
          </div>

          <div className="shadow-md cursor-pointer bg-white w-[300px] p-3 m-4 rounded-md">
            <div className="border-b border-b-1 py-2">Pending Orders</div>
            <div className="my-2 flex justify-end w-full">100</div>
          </div>

          <div className="shadow-md cursor-pointer bg-white w-[300px] p-3 m-4 rounded-md">
            <div className="border-b border-b-1 py-2">On Progress</div>
            <div className="my-2 flex justify-end w-full">100</div>
          </div>
        </div>
      </div>
    </div>
  )
}
