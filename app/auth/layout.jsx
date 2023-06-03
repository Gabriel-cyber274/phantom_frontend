"use client"
import React, {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function layout({children}) {
  const [show, setShow] = useState(false);
  const [small, setSmall] = useState(false);


  useEffect(()=> {
    let int = setTimeout(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        if(mediaQuery.matches) {
          setSmall(true);
        }else {
          setSmall(false);
        } 

        
         setShow(true);
     }, 2500);
  
     return()=> clearTimeout(int);
   })
  return (
    <>
        <div className='main_auth_cont'>
            <div className='authbg'>
                <div className={`first ${show && 'animate'}`}>
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