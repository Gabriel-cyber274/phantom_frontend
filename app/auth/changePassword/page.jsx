"use client"
import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { environment } from '../../../environment/environment';



const baseUrl = environment.scheme + environment.baseUrl;

function page() {
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const [passwordView, setPasswordView] = useState(false);
    const [confirmpasswordView, setConfirmPasswordView] = useState(false);
  
    const notify_err = (res) => toast.error(res, { theme: "colored" });
    const notify = (res)=> {
        toast.success(res, { theme: "colored" })
    } 

    useEffect(() => {
        if(localStorage.recoverEmail == null || localStorage.recoverEmail === undefined) {
            window.location.href = '/auth/login';
        }

    }, [])

    const changePassword = async(e)=> {
        e.preventDefault();
        let url = baseUrl + environment.auth.changePassword;
        if(e.target[0].value.length === 0  ) {
            notify_err('fill form');
        }
        else if (e.target[1].value !== e.target[0].value) {
            notify_err('confirm password is incorrect');
        }
        else {
            console.log(localStorage.recoverEmail);
            let data = {
                email: localStorage.recoverEmail,
                password: e.target[0].value,
            }
            try {
                const res = await axios.post(url, data);
                if(res.data.success) {
                    window.location.href = '/auth/login';
                }
                else if(res.data.errors?.password) {
                    notify_err(res.data.errors.password[0])
                }
                else {
                    notify_err(res.data.message)
                }
                
            } catch (error) {
                notify_err('error')
            }
        }
    }
    return (
        <div className='forgotMain'>
            <div className='d-flex justify-content-center  py-5 px-3 forgotNav align-items-center position-relative'>
                <a href="/auth/login" className='position-absolute'>
                    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.7859 8.73192H3.159L9.59385 2.12047C9.7089 2.00781 9.80049 1.87233 9.86306 1.72223C9.92564 1.57214 9.95791 1.41055 9.95791 1.24726C9.95791 1.08397 9.92564 0.922379 9.86306 0.772282C9.80049 0.622184 9.7089 0.486702 9.59385 0.374046C9.48421 0.255843 9.35234 0.161743 9.20626 0.0974476C9.06017 0.033152 8.90289 0 8.74397 0C8.58504 0 8.42777 0.033152 8.28168 0.0974476C8.13559 0.161743 8.00373 0.255843 7.89408 0.374046L1.095 7.35973C0.501217 7.98296 0.136448 8.79866 0.0629912 9.66751C0.0629912 9.79225 0.00228508 9.85462 0.00228508 9.97937C-0.00733214 10.1073 0.0135027 10.2358 0.0629912 10.3536C0.148614 11.2191 0.511621 12.0309 1.095 12.6614L7.89408 19.6471C8.12026 19.8748 8.42477 20.0016 8.74145 20C9.05813 19.9983 9.36138 19.8684 9.58531 19.6383C9.80924 19.4082 9.93575 19.0966 9.93735 18.7713C9.93895 18.4459 9.81551 18.133 9.59385 17.9006L3.21971 11.2268H15.7859C16.1079 11.2268 16.4167 11.0954 16.6444 10.8614C16.8721 10.6275 17 10.3102 17 9.97937C17 9.64853 16.8721 9.33123 16.6444 9.09729C16.4167 8.86335 16.1079 8.73192 15.7859 8.73192Z" fill="white"/>
                    </svg>
                </a>
                <h2 className='text-center'>New Password</h2>
            </div>
        

            <div className='mainForgot my-5'> 
                <form action="" onSubmit={changePassword} className='forgotForm'>
                    <h1>Enter New Password</h1>

                    <div className='mb-5'>
                        <div className='mt-3 position-relative'>
                            <input className='py-2 ps-1 px-4' type={passwordView ? "text" :"password"} placeholder='Password' name="" id="" />
                            <svg onClick={()=> setPasswordView(!passwordView)} style={{right: '8px', top:'12px'}} className='position-absolute' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1609 6.74609C18.632 8.21719 19.2937 9.68516 19.3211 9.74688C19.3566 9.82681 19.375 9.91331 19.375 10.0008C19.375 10.0883 19.3566 10.1748 19.3211 10.2547C19.2937 10.3164 18.632 11.7836 17.1609 13.2547C15.2008 15.2141 12.725 16.25 9.99999 16.25C7.27499 16.25 4.79921 15.2141 2.83905 13.2547C1.36796 11.7836 0.706242 10.3164 0.678899 10.2547C0.643362 10.1748 0.625 10.0883 0.625 10.0008C0.625 9.91331 0.643362 9.82681 0.678899 9.74688C0.703117 9.6875 1.36796 8.21719 2.83905 6.74609C4.79921 4.78594 7.27499 3.75 9.99999 3.75C12.725 3.75 15.2008 4.78594 17.1609 6.74609ZM10 14.375C13.1066 14.375 15.625 12.4162 15.625 10C15.625 7.58375 13.1066 5.625 10 5.625C6.8934 5.625 4.375 7.58375 4.375 10C4.375 12.4162 6.8934 14.375 10 14.375Z" fill="white"/>
                            <circle cx="10" cy="10" r="3.125" fill="white"/>
                            </svg>
                        </div>
                        <div className='mt-3 position-relative'>
                            <input className='py-2 ps-1 px-4' type={confirmpasswordView ? "text" :"password"} placeholder='Confirm Password' name="" id="" />
                            <svg onClick={()=> setConfirmPasswordView(!confirmpasswordView)} style={{right: '8px', top:'12px'}} className='position-absolute' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1609 6.74609C18.632 8.21719 19.2937 9.68516 19.3211 9.74688C19.3566 9.82681 19.375 9.91331 19.375 10.0008C19.375 10.0883 19.3566 10.1748 19.3211 10.2547C19.2937 10.3164 18.632 11.7836 17.1609 13.2547C15.2008 15.2141 12.725 16.25 9.99999 16.25C7.27499 16.25 4.79921 15.2141 2.83905 13.2547C1.36796 11.7836 0.706242 10.3164 0.678899 10.2547C0.643362 10.1748 0.625 10.0883 0.625 10.0008C0.625 9.91331 0.643362 9.82681 0.678899 9.74688C0.703117 9.6875 1.36796 8.21719 2.83905 6.74609C4.79921 4.78594 7.27499 3.75 9.99999 3.75C12.725 3.75 15.2008 4.78594 17.1609 6.74609ZM10 14.375C13.1066 14.375 15.625 12.4162 15.625 10C15.625 7.58375 13.1066 5.625 10 5.625C6.8934 5.625 4.375 7.58375 4.375 10C4.375 12.4162 6.8934 14.375 10 14.375Z" fill="white"/>
                            <circle cx="10" cy="10" r="3.125" fill="white"/>
                            </svg>
                        </div>
                        
                    </div>

                    
                    <div className='text-center mt-5 mb-3'>
                        {!loading && <button className='py-2 px-5 mt-5' >Submit</button>}
                        {loading && <div className='loadingAuth  mt-5'>
                            <div className="spinner-border text-primary" role="status">
                            </div>
                        </div>}
                    </div>

                </form>
            </div>

        </div>
    )
}

export default page
