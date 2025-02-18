'use client'

import Login from "@/components/login"

export default function Logeo() {
  return ( 
  
    <div className="flex flex-col items-center justify-center h-screen"
    style={{
      backgroundImage: `linear-gradient(to right,rgba(120, 99, 227, 0.64), rgba(99, 74, 226, 0.30)),url(/bglogin.webp)`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}    

    >
    <Login />
    </div>
                )
}