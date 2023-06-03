"use client"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function layout({children}) {

  return (
    <>
        <div className='main_auth_cont'>
            {children}
            <ToastContainer />
        </div>
    </>
  )
}

export default layout