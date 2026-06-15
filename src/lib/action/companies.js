'use server'

import { ServerMuttation } from "../core/server"

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
// export const creatNewComapny = async (newComapnyData)=>{
//     const res = await fetch(`${baseUrl}/companies`,{
//         method:"POST",
//         headers:{
//             "Content-type" : "application/json",
//         },
//         body:JSON.stringify(newComapnyData)
//     })
//     return res.json()
// }
export const creatNewComapny = async(newComapnyData)=>{
    return ServerMuttation('/companies',newComapnyData)
}