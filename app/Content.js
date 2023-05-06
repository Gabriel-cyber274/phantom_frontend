"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';


function Content() {
  const router = useRouter();
  useEffect(()=> {
    if(localStorage.phantomUser == null || localStorage.phantomUser === undefined) {
        router.replace('/auth/login');
    }
  }, [])
  return (
    <div>Content</div>
  )
}

export default Content