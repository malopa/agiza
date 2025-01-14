"use client";

import Image from "next/image";
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from 'next/navigation'
import { useAuth } from "./context/authContext";
import { login } from "./api/api";
import { saveToken } from "./utils/saveToken";
import { getToken } from "./utils/retrieveToken";
import Head from "next/head";
 

export default function Home() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setRefresh } = useAuth();

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const router = useRouter();

  const  enterLoading = async () => {
    if (!password || !username) {
      return; // Do nothing if fields are empty
    }

    if(username && password){
      setLoading(true)
      let data = {username:username,password:password}
      let {access,refresh} = await login(data)
      setLoading(false)

      // let response = await login(data)
      // alert(JSON.stringify(response))
      // return;
      setRefresh(refresh)
      saveToken(access, refresh);
      router.push("/dashboard"); // Navigate to the dashboard
     
    }else{
      showModal()
      // alert("wrong username / password")
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen font-[family-name:var(--font-geist-sans)]">
       <Head>
        <title>agiza-Login</title>
        <meta property="og:title" content="wazaxom" key="wazacom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  <main className="flex flex-col bg-white rounded-lg shadow-md p-6 w-full max-w-md items-center">
    {/* Logo Section */}
    <div className="flex items-center justify-start w-full mb-6">
      <div className="relative w-10 h-10">
        <Image src="/icon.png" alt="Icon" layout="fill" objectFit="cover" />
      </div>
      <div className="ml-2 text-lg font-bold">Agiza Log In</div>
    </div>

    {/* Username Input */}
    <div className="w-full mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
      <Input
        size="large"
        placeholder="Enter your username"
        prefix={<UserOutlined />}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>

    {/* Password Input */}
    <div className="w-full mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
      <Input.Password
        size="large"
        placeholder="Enter your password"
        className="w-full"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    {/* Log In Button */}
    <div className="w-full">
      <Button
        type="primary"
        icon={<LoginOutlined />}
        onClick={enterLoading}
        disabled={!username || !password} // Disable button if fields are empty
        className="w-full"
        loading={loading}
      >
        Log In
      </Button>
    </div>

    {/* Error Modal */}
    <Modal
      title="Login Error"
      open={open}
      onOk={hideModal}
      onCancel={hideModal}
      okText="Ok"

      cancelText="Cancel"
    >
      <p>Wrong username / password</p>
    </Modal>
  </main>
</div>

  );
}
