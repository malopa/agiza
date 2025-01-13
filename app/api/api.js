// export const BASE = `http://192.168.169.141:8000/`;
export const BASE = `https://agiza.telladvert.com/`;
//export const BASE = `ws://waza.goldtz.co.tz`;
// http://127.0.0.1:8000/
// export const BASE_URL = `http://192.168.169.141:8000/`;
//export const BASE_URL = `https://waza.goldtz.co.tz/api/v1/`;
export const BASE_URL = `https://agiza.telladvert.com/`;




export const getUsers = async (token)=>{
    const url = `${BASE_URL}api/v1/users/`;
    const res = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":"Bearer " +token 
        }
    });
    const data = await res.json();
    return data;
}


export const addClients = async (data)=>{
    const url = `${BASE_URL}cargo/api/v1/client/`;
    const res = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " +data.token
        },
        body:JSON.stringify(data)
    });
    const result = await res.json();
    return result;
}


export const getClientGroupOrder = async (data)=>{
    const url = `${BASE_URL}cargo/api/v1/order_group_read/`;
    const res = await fetch(url,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " +data.token
        },
    });
    const result = await res.json();
    return result;
}


export const getClientGroupMembers = async (data)=>{
    const url = `${BASE_URL}cargo/api/v1/order_group_member/?group_id=${data.group_id}`;
    const res = await fetch(url,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " +data.token
        },
    });
    const result = await res.json();
    return result;
}







export const addClientOrder = async (data)=>{
    const url = `${BASE_URL}cargo/api/v1/laguage/`;
    const res = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " +data.token
        },
        body:JSON.stringify(data)
    });
    const result = await res.json();
    return result;
}



export const updateClientOrder = async (data)=>{
    const url = `${BASE_URL}cargo/api/v1/laguage/${data.id}/`;
    const res = await fetch(url,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " +data.token
        },  
        body:JSON.stringify(data)
    });
    const result = await res.json();
    return result;
}


export const updateGroupOrderStatus = async (data)=>{
    const url = `${BASE_URL}cargo/api/v1/order_group/${data.id}/`;
    const res = await fetch(url,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " +data.token
        },  
        body:JSON.stringify(data)
    });
    const result = await res.json();
    return result;
}


export const updateClientOrderGroupStatus = async (data)=>{
    const url = `${BASE_URL}cargo/api/v1/order_group_supplier/`;
    const res = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " +data.token
        },
        body:JSON.stringify(data)
    });
    const result = await res.json();
    return result;
}



export const getClients = async (token)=>{
    const url = `${BASE_URL}cargo/api/v1/client_read/`;
    const res = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":"Bearer " +token 
        }
    });
    const data = await res.json();
    return data;
}



export const getNewOrder = async (token)=>{
    const url = `${BASE_URL}cargo/api/v1/laguage_read/`;
    const res = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":"Bearer " +token 
        }
    });
    const data = await res.json();
    return data;
}



export const getNewOrderByStatus = async ({token,status})=>{
    const url = `${BASE_URL}cargo/api/v1/laguage_read_status/?status=${status}`;
    const res = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":"Bearer " +token 
        }
    });
    const data = await res.json();
    return data;
}


export const getSupplier = async (token)=>{
    const url = `${BASE_URL}cargo/api/v1/supplier/`;
    const res = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":"Bearer " +token 
        }
    });
    const data = await res.json();
    return data;
}


export const addSupplier = async (data)=>{
    const url = `${BASE_URL}cargo/api/v1/supplier/`;
    const res = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " +data.token
        },
        body:JSON.stringify(data)
    });
    const result = await res.json();
    return result;
}




export const getRegions = async (token)=>{
    const url = `${BASE_URL}api/v1/region/`;
    const res = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":"Bearer " +token 
        }
    });
    const data = await res.json();
    return data;
}



export const login = async (data)=>{
    const url = `${BASE_URL}api/token/`;
    const res = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Login failed");
      }

    const body = await res.json();
    console.log("error======",body)
    return body;
}



export const getShop = async ()=>{
    const url = `${BASE_URL}business/all`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export const getUserVirstual = async ()=>{
    const url = `${BASE_URL}visualization/user`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export const getBusinesVirstual = async ()=>{
    const url = `${BASE_URL}visualize/business`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}


export const postNotifications = async (data)=>{

    const url = `${BASE_URL}send-admin-expo`;
    const res = await fetch(url,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
    });
    const body = await res.json();
    return body;
}


export const getMyRooms =async (user)=>{

    let res = await fetch(`${BASE_URL}rooms/${user}`,{
        headers:{
            'Content-Type':'application/json',
        }
    })
    let body = await res.json();
    return body;
}

