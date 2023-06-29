"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'



function Nav({text}) {
    const pathname = usePathname();
    const router = useRouter();
    const [show, setShow] = useState(false);

  useEffect(()=> {
    if(pathname.includes('leaderboard') || pathname.includes('settings') || pathname.includes('myLinks') || pathname.includes('messages')) {
      setShow(true);
    }else {
      setShow(false);
    }
  }, [pathname])


  return (
    <div className={`nav_sec ${show && 'straight'} align-items-center d-flex justify-content-between px-3 py-3`}>
        {(!pathname.includes('myLinks') && !pathname.includes('messages')) && <div className='first_side'>
          <div className='d-none'>
            <div className="first"></div>
            <div className="second my-1"></div>
            <div className="third"></div>
          </div>
        </div>}
        {(pathname.includes('myLinks') || pathname.includes('messages')) && <svg onClick={router.back} style={{cursor: 'pointer'}} width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.7859 8.73192H3.159L9.59385 2.12047C9.7089 2.00781 9.80049 1.87233 9.86306 1.72223C9.92564 1.57214 9.95791 1.41055 9.95791 1.24726C9.95791 1.08397 9.92564 0.922379 9.86306 0.772282C9.80049 0.622184 9.7089 0.486702 9.59385 0.374046C9.48421 0.255843 9.35234 0.161743 9.20626 0.0974476C9.06017 0.033152 8.90289 0 8.74397 0C8.58504 0 8.42777 0.033152 8.28168 0.0974476C8.13559 0.161743 8.00373 0.255843 7.89408 0.374046L1.095 7.35974C0.501217 7.98296 0.136448 8.79866 0.0629912 9.66751C0.0629912 9.79225 0.00228508 9.85462 0.00228508 9.97937C-0.00733214 10.1073 0.0135027 10.2358 0.0629912 10.3536C0.148614 11.2191 0.511621 12.0309 1.095 12.6614L7.89408 19.6471C8.12026 19.8748 8.42477 20.0016 8.74145 20C9.05813 19.9983 9.36138 19.8684 9.58531 19.6383C9.80924 19.4082 9.93575 19.0966 9.93735 18.7713C9.93895 18.4459 9.81551 18.133 9.59385 17.9006L3.21971 11.2268H15.7859C16.1079 11.2268 16.4167 11.0954 16.6444 10.8614C16.8721 10.6275 17 10.3102 17 9.97937C17 9.64853 16.8721 9.33123 16.6444 9.09729C16.4167 8.86335 16.1079 8.73192 15.7859 8.73192Z" fill="white"/>
        </svg>}

        <h2>{text}</h2>
        {show && <div>
        </div>}
        {!show && <Link href='/myMessages'>
          <div className='position-relative'>
            <img src="/assets/message.png" alt="" /> 
            {/* <div className='notification d-flex justify-content-center align-items-center position-absolute text-white'>1</div> */}
          </div>
        </Link>}
    </div>
  )
}

export default Nav