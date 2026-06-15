'use server'

import { ServerMuttation } from "../core/server"

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
// export const creatJob = async (newJobData)=>{
//     const res = await fetch(`${baseUrl}/jobs`,{
//         method:"POST",
//         headers:{
//             "Content-type" : "application/json",
//         },
//         body:JSON.stringify(newJobData)
//     })
//     return res.json()
// }
export const creatJob = async (newJobData)=>{
    return ServerMuttation('/jobs',newJobData)
}