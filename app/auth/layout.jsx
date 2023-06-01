"use client"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function layout({children}) {
  return (
    <>
        <div className='main_auth_cont'>
            <div className='authbg'>
                <div className='first'>
                    <img src="/assets/design.png" alt="" />
                </div>
            </div>
            {children}
            <ToastContainer />
        </div>
    </>
  )
}

export default layout