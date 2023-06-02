"use client"
import React, {useEffect, useState} from 'react'
import Footer from '../../components/footer'
import api from '../../components/api';
import {environment} from '../../environment/environment'
import { getCookie } from 'cookies-next';
import { ToastContainer, toast } from 'react-toastify';
import WelcomeScreens from './WelcomeScreens'
import Nav2 from '../../components/nav2'
import Main from './Main'
import io from 'socket.io-client';

const socket = io.connect(environment.socketUrl); 
function Content() {
    const [loading, setLoading] = useState(true);
    const [loadingMain, setLoadingMain] = useState(true);
    let token = getCookie('token');
    const [sentRooms, setSentRooms] = useState([]);
    const [receivedRooms, setReceivedRooms] = useState([]);
    const [finished, setFinished] = useState(false);
    const [sent, setSent] = useState(false);
    const [userInfo, setUserInfo] = useState({})

    const notify_err = (res) => toast.error(res, { theme: "colored" });
    const notify = (res)=> {
      toast.success(res, { theme: "colored" })
    } 
  
    const getRooms = async()=> {
        try {
            const res = await api.get(environment.room.sentRooms, {
                headers: {
                    'Content-Type' : 'applications/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            
            const res2 = await api.get(environment.room.recievedRooms, {
                headers: {
                    'Content-Type' : 'applications/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            
            const res3 = await api.get(environment.auth.info, {
                headers: {
                    'Content-Type' : 'applications/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            setLoading(false);
            setLoadingMain(false);


            if(res.data.success) {
                setSentRooms(res.data.rooms);
            }else {
                notify_err(res.data.message);
            }
            
            if(res2.data.success) {
                setReceivedRooms(res2.data.rooms);
            }else {
                notify_err(res2.data.message);
            }
            

            if(res3.data.user.tutorial == 0) {
                setFinished(false);
            }else {
                setFinished(true);
            }

            setUserInfo(res3.data.user);

        } catch (error) {
            setLoading(false);
            // notify_err('error');
        }
    }

    useEffect(() => {
        getRooms();
    })


    useEffect(() => { 
        socket.emit('onLine', JSON.parse(localStorage.currentUser).user.id)
    
        socket.emit('userRoom', JSON.parse(localStorage.currentUser).user.id);

        socket.on('userUpdate', message=> {
            getRooms();
        })
    
      }, [socket]);


    // socket.emit('joinRoom', params[1])
    
    return (
        <div>
            {loading && 
                <div className='loadingRoom d-flex justify-content-center align-items-center'>
                    <div className="spinner-border text-primary" role="status">
                    </div>
                </div>
            }

            {!loading && !finished &&
                <WelcomeScreens setFinished={setFinished} />
            }

            {!loading && finished &&
                <div>
                    <Nav2 data={sent ? sentRooms : receivedRooms} sent={sent} setSentRooms={setSentRooms} setReceivedRooms={setReceivedRooms} loadingMain={loadingMain} setSent={setSent} setLoadingMain={setLoadingMain} />
                    <Main userInfo={userInfo} data={sent ? sentRooms : receivedRooms} loadingMain={loadingMain} />
                    <Footer />
                </div>
            }
        </div>
    )
}

export default Content
