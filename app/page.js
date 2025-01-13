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
 

export default function Home() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
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

      let data = {username:username,password:password}
      let {access,refresh} = await login(data)
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
    <div className="bg-gray-100 flex items-center justify-center h-[90vh] font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col bg-white rounded mt-8 min-h-[20vh]  p-4 m-auto shadow-md items-center justify-center w-full p-2 lg:w-1/5">
        <div className="flex items-center justify-start w-full mb-8 ">
          <div style={{ position: "relative", width: "40px", height: "40px" }}>
            <Image
              src="/icon.png"
              alt="Icon"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="ml-2 font-bold">Agiza Log In</div>
        </div>

        <div className="w-full">
          <label className="block leading-8">Username</label>
          <Input
            size="large"
            placeholder="Enter your username"
            prefix={<UserOutlined />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mt-4 w-full">
          <label className="block leading-8">Password</label>
          <Input.Password
            size="large"
            placeholder="Enter your password"
            className="w-full"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-end w-full mt-6">

          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={enterLoading}
            disabled={!username || !password} // Disable button if fields are empty
          >
            Log In
          </Button>
        </div>



        <Modal
        title="Modal"
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
