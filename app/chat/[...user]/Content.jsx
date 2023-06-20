"use client"
import React, { useEffect, useState, useRef } from 'react'
import ChatNav from './chatNav'
import ChatInput from './chatInput'
import api from '../../../components/api';
import {environment} from '../../../environment/environment'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { getCookie } from 'cookies-next';
import io from 'socket.io-client';
import Audio from '../../../components/audio2'
import Draggable from 'react-draggable';



const socket = io.connect(environment.socketUrl); 

function Content({params}) {
  const router = useRouter();
  let token = getCookie('token');
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(true);
  const chatBodyRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [reply, setReply] = useState(null);
  const [roomInfo, setRoomInfo] = useState({});
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const defaultPosition = { x: 0, y: 0 };
  const [messageId, setMessageId] = useState();
  const [messageR, setMessageR] = useState({});
  const holdTimeoutRef = useRef(null);
  const [showReply, setShowReply] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);


  
  const notify_err = (res) => toast.error(res, { theme: "colored" });
  const notify = (res)=> {
    toast.success(res, { theme: "colored" })
  } 

  const readMessages = async() => {
    try {
        const res = await api.get(environment.messages.read + params[1], {
            headers: {
                'Content-Type' : 'multipart/form-data; boundary=<calculated when request is sent>',
                'Accept' : 'applications/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        setLoading(false);
        
        socket.emit('seen', params[2]);
        socket.emit('userRoom', params[2]);


        
        if(!res.data.success) {
            notify_err(res.data.message);
        }

    } catch (error) {
        // notify_err('error');
    }
  }

  const getMessages = async()=> {
      try {  
          const res = await api.get(environment.messages.getMessage + params[1], {
              headers: {
                'Content-Type' : 'multipart/form-data; boundary=<calculated when request is sent>',
                'Accept' : 'applications/json',
                'Authorization': `Bearer ${token}`,
              },
          });
          

          setLoading(false);

          socket.emit('joinRoom', params[1]);

          if(chatBodyRef.current !== null) {
            chatBodyRef.current.scrollIntoView({
                behavior: 'smooth'
            });
          }else {
              
          }



          if(res.data.success) {
            setMessages(res.data.messages)
            setRoomInfo(res.data.room_info)
            readMessages();
            console.log(res.data.room_info);
          }
          else {
            notify_err(res.data.message)
          }


        //   console.log(res.data, 'message')  
      } catch (error) {
        //   notify_err('error');
      }
  }

  const checkRoom = async()=> {
      try {
        const res = await api.get(environment.room.checkRoom + params[params.length > 4 ? 1: params.length-2], {
            headers: {
                'Content-Type' : 'multipart/form-data; boundary=<calculated when request is sent>',
                'Accept' : 'applications/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        
        const res2 = await api.get(environment.auth.info, {
            headers: {
                'Content-Type' : 'multipart/form-data; boundary=<calculated when request is sent>',
                'Accept' : 'applications/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        setLoading(false);
        if(res.data.success) {
            router.push(`chat/${params[3]}/${res.data.room.id}/${res2.data.user.id === res.data.room.user_id ? res.data.room.creator_id : res.data.room.user_id}/${params[params.length > 4 ? 4: params.length-1]}`)
            socket.emit('joinRoom', res.data.room.id);
            setExists(true);
        }else {
            setExists(false);
        }
        
      } catch (error) {
        //   notify_err('error');
        console.log(error);
      }
  }

    useEffect(()=> {
        if(params.length == 4) {
            getMessages();
        }
        else {
            checkRoom();
        }

        if(localStorage.link !== undefined) {
            localStorage.removeItem('link');
        }

        
        if(!loading) {
            setUserInfo(JSON.parse(localStorage.currentUser).user)
            chatBodyRef.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        socket.emit('onLine', JSON.parse(localStorage.currentUser).user.id)

    }, [loading]);

    // useEffect(()=> {
    // }, [loading]);


    useEffect(() => { 
        socket.on('usersOnline', message=> {
            setOnlineUsers(message)
        });

        socket.on('getmessages', async (message)=> {    
            const res = await api.get(environment.messages.getMessage + params[1], {
                headers: {
                    'Content-Type' : 'multipart/form-data; boundary=<calculated when request is sent>',
                    'Accept' : 'applications/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            
            if(res.data.success) {
                setMessages(res.data.messages)
                setRoomInfo(res.data.room_info)
            }
            else {
                notify_err(res.data.message)
            }
        
        });    
        // return () => {
        //   socket.disconnect(); // Disconnect the socket when the component unmounts
        // };
      }, []);

    const scrollToMesssage = (id)=> {
        let chat = document.querySelectorAll('.chat .mess');

        for (let i = 0; i < chat.length; i++) {
            chat[i].classList.remove('activeR')

            if(chat[i].id === JSON.stringify(id)) {
                chat[i].scrollIntoView({
                    behavior: 'smooth'
                });
                chat[i].classList.add('activeR')
                setTimeout(() => {
                    chat[i].classList.remove('activeR')
                }, 1000);
            }
        }
        
    }

    
    const handleStart = (e, id)=> {
        console.log(e, 'start')
        
    }

    const handleDrag = (e, data)=> {
        console.log(e, 'drag')
        setPosition({ x: data.x, y: data.y });
    }

    const handleStop = (e)=> {
        console.log(e, 'stop')
        setPosition(defaultPosition);
        setReply(messageR)
    }


    const handleTouchStart = (message) => {
      holdTimeoutRef.current = setTimeout(() => {
        setMessageR(message)
        setMessageId(message.id)
        setShowReply(true)
      }, 500);
    };
  
    const handleTouchEnd = () => {
      clearTimeout(holdTimeoutRef.current);
    };


    return (

        <div className='entireChat position-relative'>
            <ChatNav setMessageId={setMessageId} setShowReply={setShowReply} showReply={showReply} setReply={setReply} messageR={messageR} roomInfo={roomInfo} name={params.length==4 ? params[0] : params[3]} onlineUsers={onlineUsers} fullpath={params} />

            {loading && 
                <div className='d-flex justify-content-center align-items-center' style={{width: '100%', height: '100vh'}}>
                    <div className="spinner-border text-primary" role="status">
                    </div>
                </div>
            }

            {!loading && <div className='chatBody' onClick={()=> setShowEmoji(false)}>
                <div className='ps-3 pe-4 chat'>
                    {messages.map((message, idx)=> (
                        <div key={idx}>
                            {/* <Draggable
                            axis="x"
                            // handle=".handle"
                            // cancel=".clickable"
                            defaultPosition={defaultPosition}
                            position={messageId == idx ? position : defaultPosition}
                            bounds={{ left: 0, right: 200, top:0, bottom:0 }}
                            // bounds="parent"
                            grid={[25, 25]}
                            scale={1}
                            onStart={(event)=> {event.stopPropagation(); setMessageId(idx); setMessageR(message)}}
                            onDrag={handleDrag}
                            onStop={handleStop}
                            > */}
                                <div style={{cursor:'pointer', background: message.id == messageId && 'rgba(70, 90, 218, 0.28)'}} className="draggable-clickable-element"       
                                onTouchStart={()=> handleTouchStart(message)}
                                onTouchEnd={handleTouchEnd}
                                onTouchCancel={handleTouchEnd}
                                onMouseDown={()=> handleTouchStart(message)}
                                onMouseUp={handleTouchEnd}
                                onMouseLeave={handleTouchEnd}
                                >
                                    <div className={`${message.sender_id !== userInfo.id ?'friend': 'me'} mess handle position-relative mess mb-5 p-2 `} id={message.id}>
                                        {message.message_id !== null && <div className='replySide position-relative py-2 px-3' onClick={()=> scrollToMesssage(message.message_id)}>
                                            <h5 style={{color: parseInt(message.reply_id) === userInfo.id? '#96A4FF': '#F5D616', }}>{parseInt(message?.reply_id) === userInfo.id ? 'You' : (parseInt(message?.reply_id) !== userInfo.id && params.length==4 && message.message_id !== null) ? params[0] : params[3]}</h5>
                                            {message.reply_message !== null && <h6 className='mt-2'>{message.reply_message?.length >= 37? message.reply_message?.slice(0,35) + '...' : message.reply_message}</h6>}
                                            {message.reply_message == null && <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 0C7.79565 0 8.55871 0.316071 9.12132 0.87868C9.68393 1.44129 10 2.20435 10 3V9C10 9.79565 9.68393 10.5587 9.12132 11.1213C8.55871 11.6839 7.79565 12 7 12C6.20435 12 5.44129 11.6839 4.87868 11.1213C4.31607 10.5587 4 9.79565 4 9V3C4 2.20435 4.31607 1.44129 4.87868 0.87868C5.44129 0.316071 6.20435 0 7 0ZM14 9C14 12.53 11.39 15.44 8 15.93V19H6V15.93C2.61 15.44 0 12.53 0 9H2C2 10.3261 2.52678 11.5979 3.46447 12.5355C4.40215 13.4732 5.67392 14 7 14C8.32608 14 9.59785 13.4732 10.5355 12.5355C11.4732 11.5979 12 10.3261 12 9H14Z" fill="#F5D616"/>
                                                </svg>}
                                            <div className='design position-absolute' style={{backgroundColor: parseInt(message.reply_id) === userInfo.id? '#96A4FF': '#F5D616'}}>

                                            </div>
                                        </div>}         
                                        {message.message == null && 
                                            <div className='vn_message clickable'>
                                                <Audio id={idx} sender_id={message.sender_id} src={environment.scheme + environment.baseUrl + environment.messages.voicenoteGet + message.voicenote?.name} />
                                            </div>
                                        }
                                        {message.message !== null && <p>{message.message}</p>}

                                        <h3 className='position-absolute mess_time' style={{left: message.sender_id !== userInfo.id && '0', right: message.sender_id == userInfo.id && '0'}}>{parseInt(message.created_at.slice(message.created_at.indexOf('T')+1, message.created_at.indexOf('.')-3).slice(0, message.created_at.slice(message.created_at.indexOf('T')+1, message.created_at.indexOf('.')-3).indexOf(':'))) < 12 ? message.created_at.slice(message.created_at.indexOf('T')+1, message.created_at.indexOf('.')-3) + ' ' + 'AM' : message.created_at.slice(message.created_at.indexOf('T')+1, message.created_at.indexOf('.')-3) + ' ' + 'PM'}</h3>
                                    </div>
                                </div>
                            {/* </Draggable> */}

                        </div>
                    ))}

                    <div style={{height: '70px'}} ref={chatBodyRef}></div>
                </div>
            </div>}
            <ChatInput setShowEmoji={setShowEmoji} showEmoji={showEmoji} setShowReply={setShowReply} setMessageId={setMessageId} allow={roomInfo.links} reply={reply} userInfo={userInfo} setReply={setReply} chatBodyRef={chatBodyRef} setExists={setExists} exists={exists} fullpath={params} />
        </div>
    )
}

export default Content
