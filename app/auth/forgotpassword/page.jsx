"use client"
import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { environment } from '../../../environment/environment';



const baseUrl = environment.scheme + environment.baseUrl;
function Page() {
  const [questionSelected, setQuestionSelected] = useState(false);
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  
  const notify_err = (res) => toast.error(res, { theme: "colored" });
  const notify = (res)=> {
      toast.success(res, { theme: "colored" })
  } 

  useEffect(() => {
      localStorage.removeItem('recoverEmail');
  }, [])

  const forgotPassword = async(e)=> {
      e.preventDefault();
      let url = baseUrl + environment.auth.forgotPasswordCheck;
      if(e.target[0].value.length === 0 || e.target[1].value.length === 0  || e.target[2].value.length === 0 ) {
        notify_err('fill form');
      }
      else {
        let data = {
            email: e.target[0].value,
            question: e.target[1].value,
            answer: e.target[2].value.toLocaleUpperCase()
        }
        try {
            const res = await axios.post(url, data);
            localStorage.setItem('recoverEmail', e.target[0].value)
            if(res.data.success) {
                window.location.href = '/auth/changePassword';
            }else {
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
                <h2 className='text-center'>Forgot Password</h2>
            </div>
        
            <p>Please enter the email address linked to your account and answer the security question.</p>

            <div className='mainForgot my-5'> 
                <form action="" onSubmit={forgotPassword} className='forgotForm'>
                    <h1>Fill the input fields</h1>

                    <div className='mb-5'>
                        <div className='mt-3 position-relative'>
                            <input className='py-2 ps-1 px-4' type="email" placeholder='Email' name="" id="" />
                            <svg style={{right: '8px', top:'12px'}} className='position-absolute' width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.502 13.449L0.802002 4.11902V16.119H22.207V4.11902L11.502 13.449ZM11.502 10.6351L0.802002 1.29803V0.261047H22.207V1.29803L11.502 10.6351Z" fill="white"/>
                            </svg>
                        </div>
                        
                        <div className='mt-3 position-relative'>
                            <select className='py-2 ps-1 px-4' onChange={(e)=> e.target.value !== '' ? setQuestionSelected(true): setQuestionSelected(false)} name="" id="">
                            <option value="" selected>PICK A SECURITY QUESTION</option>
                            <option value="Your first pet's name">{"Your first pet's name"}</option>
                            <option value="Your surname">Your surname</option>
                            <option value="Your favorite food">Your favorite food</option>
                            <option value="Your favorite color">Your favorite color</option>
                            </select>
                        </div>

                    
                        {questionSelected && <div className='mt-3 position-relative'>
                            <input  className='py-2 ps-1 px-4' type="text" placeholder='Answer' name="" id="" />
                        </div>}

                    </div>

                    
                    <div className='text-center mt-5 mb-3'>
                        {!loading && <button className='py-2 px-5 mt-5' >send</button>}
                        {loading && <div className='loadingAuth  mt-5'>
                            <div className="spinner-border text-primary" role="status">
                            </div>
                        </div>}
                    </div>

                    <a href="/auth/login"><h5 className='text-center mt-5'>Back to sign in</h5></a>

                    <h4 className='text-center my-5'>New to Phantom? <a href="/auth/register">Get Started</a></h4>
                </form>
            </div>

        </div>
    )
}

export default Page
