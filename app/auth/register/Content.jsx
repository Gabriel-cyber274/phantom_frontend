"use client"
import React, {useEffect, useState} from 'react'
import { environment } from '../../../environment/environment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';



const baseUrl = environment.scheme + environment.baseUrl;
function Content() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [supported, setSupported] = useState(false);
  const [location, setLocation] = useState('');


  const notify_err = (res) => toast.error(res, { theme: "colored" });
  const notify = (res)=> {
      toast.success(res, { theme: "colored" })
  } 

  useEffect(()=> {
   let int = setTimeout(() => {
      setShow(true);
  }, 2500);

    return()=> clearTimeout(int);
  }, [])

  useEffect (()=> {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const APIKEY = "004bfa912252b9d9cadcf4c1c3e55c50"; 
        let api = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${APIKEY}`
        fetch(api)
        .then(response => response.json())
        .then(data => {
          setSupported(true);
          setLocation(data.name)
        })
        .catch(error => {
          setSupported(false);
          console.error(error);
        });
      })
      
    }else {
      setSupported(false);
      console.log('geolocation is not supported in your browser');
    }
  });

  const signUp = async(e)=> {
    e.preventDefault();
    let url = baseUrl + environment.auth.register;
    if(e.target[0].value.length == 0 || e.target[1].value.length == 0 || e.target[2].value.length == 0 || e.target[3].value.length == 0) {
      notify_err('fill form to signup');
    }
    else if(e.target[3].value !== e.target[4].value) {
      notify_err('confirm password is incorrect');
    }
    else {
      let data = {
        name: e.target[0].value,
        email: e.target[1].value,
        location: e.target[2].value,
        password: e.target[3].value,
      }
      
      try {
        const res = await axios.post(url, data);
        if(res.data.success) {
            notify(res.data.message);
            setTimeout(() => {
              window.location.href = '/auth/login';
            }, 1500);
        }
        else if(res.data.errors?.password) {
          notify_err(res.data.errors.password[0])
        }
        else if(res.data.errors?.email) {
          notify_err(res.data.errors.email[0])
        }
      } catch (error) {
          notify_err('error')

          return error
      }

    }

  }

  return (
    <>  
        {!show && <div className='text-center d-flex align-items-center justify-content-center img_Animate' style={{position: 'relative', zIndex: '1', height: '100vh'}}>
            <img src="/assets/phantomL.png" alt="" />
        </div>}
        {show && 
          <div className='d-flex justify-content-center align-items-end' style={{width: '100%', height: '100%'}}>
            <div className='d-flex main_auth_dis_cont justify-content-center align-items-center' style={{width: '100%', }}>
                <div className='main_auth_dis d-md-flex d-block position-relative align-items-center'>
                    <div className='first text-center'>
                        <img src="/assets/phantomL.png" alt="" />
                        <h2>Phantom</h2>
                    </div>
                    <div className={`second py-5 d-flex justify-content-center align-items-center`}>
                        <div className='first_child'>
                          <div className='auth_form'>
                              <h2>Create Account</h2>
                              <form action="" onSubmit={signUp}>
                                <div className='position-relative mt-3'>
                                    <input  className='py-2 ps-1 px-4' type="text" placeholder='name' name="" id="" />
                                    <svg className='position-absolute' width="23" height="23" viewBox="0 0 23 23"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.269 12.151C17.1946 11.2117 17.8219 10.0197 18.0721 8.72484C18.3222 7.43001 18.184 6.09013 17.6749 4.87361C17.1657 3.65709 16.3083 2.61822 15.2105 1.88757C14.1126 1.15691 12.8233 0.76709 11.5045 0.76709C10.1857 0.76709 8.89639 1.15691 7.79853 1.88757C6.70066 2.61822 5.84328 3.65709 5.33413 4.87361C4.82498 6.09013 4.68679 7.43001 4.93693 8.72484C5.18707 10.0197 5.81438 11.2117 6.74 12.151C4.99275 12.8379 3.49231 14.0341 2.43344 15.5845C1.37457 17.1348 0.806166 18.9676 0.802002 20.845C0.801871 21.0208 0.836389 21.1948 0.903584 21.3572C0.970778 21.5196 1.06933 21.6671 1.1936 21.7914C1.31787 21.9157 1.46542 22.0142 1.62782 22.0814C1.79021 22.1486 1.96426 22.1831 2.14 22.183H20.87C21.0457 22.1831 21.2198 22.1486 21.3822 22.0814C21.5446 22.0142 21.6921 21.9157 21.8164 21.7914C21.9407 21.6671 22.0392 21.5196 22.1064 21.3572C22.1736 21.1948 22.2081 21.0208 22.208 20.845C22.2038 18.9675 21.6352 17.1346 20.5761 15.5842C19.5171 14.0339 18.0164 12.8377 16.269 12.151ZM7.491 7.46701C7.494 5.25101 7.491 9.68401 7.491 7.46701Z" fill="#F5D716"/>
                                    </svg>
                                </div>
                                <div className='mt-3 position-relative'>
                                    <input className='py-2 ps-1 px-4' type="email" placeholder='Email' name="" id="" />
                                    <svg className='position-absolute' width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.502 13.449L0.802002 4.11902V16.119H22.207V4.11902L11.502 13.449ZM11.502 10.6351L0.802002 1.29803V0.261047H22.207V1.29803L11.502 10.6351Z" fill="white"/>
                                    </svg>
                                </div>
                                <div className='mt-3 position-relative'>
                                    <input required value={location} onChange={(e)=> !supported && setLocation(e.target.value)} className='py-2 ps-1 px-4' type="text" placeholder='location' name="" id="" />
                                    <svg className='position-absolute' width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.502 13.449L0.802002 4.11902V16.119H22.207V4.11902L11.502 13.449ZM11.502 10.6351L0.802002 1.29803V0.261047H22.207V1.29803L11.502 10.6351Z" fill="white"/>
                                    </svg>
                                </div>
                                <div className='mt-3 position-relative'>
                                  <input  className='py-2 ps-1 px-4' type="password" placeholder='Password' name="" id="" />
                                  <svg className='position-absolute' width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7.148 12.2271C6.33665 10.4325 6.18059 8.41017 6.70702 6.51238C7.23345 4.61459 8.409 2.96164 10.0289 1.84148C11.6487 0.72132 13.6103 0.20496 15.5717 0.382355C17.5331 0.559751 19.3702 1.41966 20.7628 2.81227C22.1554 4.20488 23.0153 6.04193 23.1927 8.00337C23.3701 9.96481 22.8537 11.9263 21.7336 13.5462C20.6134 15.1661 18.9605 16.3416 17.0627 16.868C15.1649 17.3945 13.1426 17.2384 11.348 16.4271L10.6 17.1751H7.802V19.9751H5.002V22.7751H0.802002V18.5751L7.148 12.2271ZM14.797 11.5751C15.3508 11.5751 15.8921 11.4108 16.3526 11.1032C16.8131 10.7955 17.1719 10.3582 17.3839 9.84657C17.5958 9.33494 17.6512 8.77196 17.5432 8.22881C17.4352 7.68566 17.1685 7.18675 16.7769 6.79516C16.3853 6.40358 15.8864 6.1369 15.3433 6.02886C14.8001 5.92082 14.2371 5.97627 13.7255 6.1882C13.2139 6.40012 12.7766 6.75901 12.4689 7.21946C12.1612 7.67992 11.997 8.22127 11.997 8.77506C11.9965 9.1431 12.0685 9.50763 12.209 9.8478C12.3495 10.188 12.5556 10.4971 12.8157 10.7575C13.0757 11.018 13.3846 11.2246 13.7246 11.3655C14.0645 11.5065 14.429 11.5791 14.797 11.5791V11.5751Z" fill="white"/>
                                  </svg>
                                </div>
                                <div className='mt-3 position-relative'>
                                  <input  className='py-2 ps-1 px-4' type="password" placeholder='Confirm Password' name="" id="" />
                                  <svg className='position-absolute' width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7.148 12.2271C6.33665 10.4325 6.18059 8.41017 6.70702 6.51238C7.23345 4.61459 8.409 2.96164 10.0289 1.84148C11.6487 0.72132 13.6103 0.20496 15.5717 0.382355C17.5331 0.559751 19.3702 1.41966 20.7628 2.81227C22.1554 4.20488 23.0153 6.04193 23.1927 8.00337C23.3701 9.96481 22.8537 11.9263 21.7336 13.5462C20.6134 15.1661 18.9605 16.3416 17.0627 16.868C15.1649 17.3945 13.1426 17.2384 11.348 16.4271L10.6 17.1751H7.802V19.9751H5.002V22.7751H0.802002V18.5751L7.148 12.2271ZM14.797 11.5751C15.3508 11.5751 15.8921 11.4108 16.3526 11.1032C16.8131 10.7955 17.1719 10.3582 17.3839 9.84657C17.5958 9.33494 17.6512 8.77196 17.5432 8.22881C17.4352 7.68566 17.1685 7.18675 16.7769 6.79516C16.3853 6.40358 15.8864 6.1369 15.3433 6.02886C14.8001 5.92082 14.2371 5.97627 13.7255 6.1882C13.2139 6.40012 12.7766 6.75901 12.4689 7.21946C12.1612 7.67992 11.997 8.22127 11.997 8.77506C11.9965 9.1431 12.0685 9.50763 12.209 9.8478C12.3495 10.188 12.5556 10.4971 12.8157 10.7575C13.0757 11.018 13.3846 11.2246 13.7246 11.3655C14.0645 11.5065 14.429 11.5791 14.797 11.5791V11.5751Z" fill="white"/>
                                  </svg>
                                </div>
                                <div className='text-center mt-5 mb-3'>
                                  <button className='py-2 px-5'>Sign Up</button>
                                </div>
                                <h3 className='text-center'>Already have an account? <a href={'/auth/login'}>Sign in</a></h3>
                              </form>
                          </div>
                        </div>
                    </div>
                    <div className='position-absolute auth_page_des'>
                        <img src="/assets/design2.png" alt="" />
                        <img src="/assets/design2.png" alt="" />
                        <img src="/assets/design2.png" alt="" />
                        <img src="/assets/design2.png" alt="" />
                        <img src="/assets/design2.png" alt="" />
                        <img src="/assets/design2.png" alt="" />
                        <img src="/assets/design2.png" alt="" />
                        <img src="/assets/design2.png" alt="" />
                        <img src="/assets/design2.png" alt="" />
                        <img src="/assets/design2.png" alt="" />
                        <img src="/assets/design2.png" alt="" />
                        <img src="/assets/design2.png" alt="" />
                    </div>
                </div>
            </div>
          </div>
        }
    </>
  )
}

export default Content