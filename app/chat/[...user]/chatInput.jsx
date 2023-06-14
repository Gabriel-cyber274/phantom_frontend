"use client"
import React, {useState, useEffect, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import api from '../../../components/api';
import {environment} from '../../../environment/environment'
import Sentiment from 'sentiment';
import io from 'socket.io-client';
import Waveform from '../../../components/audioD'


const socket = io.connect(environment.socketUrl); 

function ChatInput({fullpath, exists, setExists, userInfo, chatBodyRef, setReply, reply, allow}) {
    let token = getCookie('token');
    const router = useRouter();
    const [text, setText] = useState('');
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [sending, setSending] = useState(false);
    const audioBRef = useRef(null); 
    
    

    const notify_err = (res) => toast.error(res, { theme: "colored" });
    const notify = (res)=> {
      toast.success(res, { theme: "colored" })
    } 



    const createRoom = async(linkName, userId, message)=> {
        setSending(true);

        try {
            const data = {
                linkName: linkName,
                user_id: userId,
            }
            const res = await api.post(environment.room.create, data, {
                headers: {
                    'Content-Type' : 'multipart/form-data; boundary=<calculated when request is sent>',
                    'Accept' : 'applications/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if(res.data.success) {
                sendText(res.data.room.id, res.data.room.user_id, message)
            }else {
                notify_err(res.data.message);
            }
        } catch (error) {
            notify_err('error');
            console.log(error, 'create')
        }

    }

    const sendText = async(roomid, userId, message)=> {
        setSending(true);
        let type;
        const sentiment = new Sentiment();
        const result = sentiment.analyze(message);
        if(result.score < 0) {
            type='bad'
        }
        else if(result.score === 0) {
            type='good'
        }
        else {
            type='medium'
        }

        try {
            const data = {
                room_id: roomid,
                user_id: userId,
                type: type,
                message: message,
                message_id: reply !== null && reply.id
            }
            
            const data3 = {
                room_id: roomid,
                user_id: userId,
                type: 'medium',
                message_id: reply !== null && reply.id
            }


            const res = await api.post(reply == null ? environment.messages.sendMessage : environment.messages.sendReply, audioUrl == null ? data : data3, {
                headers: {
                    'Content-Type' : 'multipart/form-data; boundary=<calculated when request is sent>',
                    'Accept' : 'applications/json',
                    'Authorization': `Bearer ${token}`,
                },
            });


            setReply(null);

            const data2 = {
                room_id: roomid,
                user_id: userId,
            }

            if(audioUrl == null) {
                socket.emit('sendMessage', data2);
                socket.emit('userRoom', userId);
            }


            setText('');

            if(fullpath.length > 4 && audioUrl == null) {
                window.location.reload();
            }
            
            if(!exists && res.data.success && audioUrl !== null) {
                uploadAudio(res.data.sent.id, data2, userId)
            }
            else if (exists && res.data.success && audioUrl !== null) {
                uploadAudio(res.data.sent.id, data2, userId)
            }
            else if(!exists && res.data.success && audioUrl == null) {
                setSending(false);
                router.refresh();
                setExists(true);
                chatBodyRef.current.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            else if(res.data.success && exists && audioUrl == null) {
                setSending(false);
                router.refresh();
                chatBodyRef.current.scrollIntoView({
                    behavior: 'smooth'
                });
            }else {
                notify_err(res.data.message);
                setSending(false);
            }
        } catch (error) {
            setSending(false);
            notify_err('error');
            console.log(error);
        }
    }

    const sendMessage = async()=> {
        if(fullpath.length > 4 && !exists && !checkForLink(text) && !sending) {
            createRoom(fullpath[5], fullpath[1], text);
        }
        else if (fullpath.length > 4 && !exists && checkForLink(text) && !sending) {
            notify_err("you can't send links")
        }
        else if (exists && fullpath.length == 4 && allow == 0 && !checkForLink(text) && !sending) {
            sendText(fullpath[1], fullpath[2], text)
        }
        else if (exists && fullpath.length == 4 && allow == 0 && checkForLink(text) && !sending) {
            notify_err("you can't send links")
        }
        else if (exists && fullpath.length == 4 && allow == 1 && !sending) {
            sendText(fullpath[1], fullpath[2], text)
        }

    }

    const voiceRecord = ()=> {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.start();

          let sec = 0
          let min = 0;
          let int = setInterval(() => {
              sec ++
              if(sec == 60) {
                sec = 0;
                min ++
              }
                
            if(min == 3) {
                audioBRef.current.click();
            }   
                
            setMinutes(min)
            setSeconds(sec);

          }, 1000);
  
          const audioChunks = [];
          mediaRecorder.addEventListener('dataavailable', (event) => {
            audioChunks.push(event.data);
          });
          setAudioUrl(null);
          
  
          mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audiourl = URL.createObjectURL(audioBlob);
            const file = new File([audioBlob], 'filename.mp4', { type: audioBlob.type });
            setAudioUrl(audiourl)
            setMinutes(0)
            setSeconds(0);
            clearInterval(int);
            setAudioFile(file)
          });
  
          setRecording(true);
        })
        .catch((error) => {
            notify_err('Error accessing microphone');
        });
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
          setRecording(false);
        }
    };


    const uploadAudio = async (id, data2, userId)=> {
        setSending(true);
        try {
            const formData = new FormData();
            formData.append('file', audioFile)
            formData.append('message_id', id);

            const res = await api({
                url: environment.messages.voiceNote,  
                method: 'POST',
                headers: {
                    'Content-Type' : 'multipart/form-data; boundary=<calculated when request is sent>',
                    'Accept' : 'applications/json',
                    'Authorization': `Bearer ${token}`,
                },
                data: formData,
            });
    
            setAudioUrl(null)
            setAudioFile(null);
    
            setSending(false);

            socket.emit('sendMessage', data2);
            socket.emit('userRoom', userId);
            
            if(fullpath.length > 4) {
                window.location.reload();
            }else {
                router.refresh();
            }
    
            setSending(false);
            if(res.data.success) {
                chatBodyRef.current.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            else {
                notify_err(res.data.message);
            }
        } catch (error) {
            notify_err('error')
            console.log(error);
        }
    }
    

    const sendRecord = async()=> { 
        if(fullpath.length > 4 && !exists && !checkForLink(text) && !sending) {
            createRoom(fullpath[5], fullpath[1], text);
        }
        else if (fullpath.length > 4 && !exists && checkForLink(text) && !sending) {
            notify_err("you can't send links")
        }
        else if (exists && fullpath.length == 4 && allow == 0 && !checkForLink(text) && !sending) {
            sendText(fullpath[1], fullpath[2], text)
        }
        else if (exists && fullpath.length == 4 && allow == 0 && checkForLink(text) && !sending) {
            notify_err("you can't send links")
        }
        else if (exists && fullpath.length == 4 && allow == 1 && !sending) {
            sendText(fullpath[1], fullpath[2], text)
        }

    }


    function checkForLink(input) {
        // var urlPattern = /(http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.)?/gi;

        // return urlPattern.test(input);
        if(input.includes('http') || input.includes('https') || input.includes('www')) {
            return true
        }else{
            return false;
        }
    }

    return (
        <>
            {reply !== null && <div className={`reply_main_cont ${reply.sender_id !== userInfo.id? 'friend_reply': 'your_reply'}  px-3 py-2 position-absolute`}>
                <div className='position-relative d-flex justify-content-between align-items-center'>
                    <div>
                        <h2 style={{color: reply.sender_id !== userInfo.id? '#96A4FF' : '#F5D616' }}>{reply.sender_id !== userInfo.id? fullpath[0] : 'You'}</h2>
                        {reply.message !== null && <h5 style={{color: reply.sender_id !== userInfo.id ? 'black' : 'white'}} className='mt-2'>{reply.message?.length >= 37? reply.message?.slice(0,35) + '...' : reply.message}</h5>}
                        {reply.message == null && <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0C7.79565 0 8.55871 0.316071 9.12132 0.87868C9.68393 1.44129 10 2.20435 10 3V9C10 9.79565 9.68393 10.5587 9.12132 11.1213C8.55871 11.6839 7.79565 12 7 12C6.20435 12 5.44129 11.6839 4.87868 11.1213C4.31607 10.5587 4 9.79565 4 9V3C4 2.20435 4.31607 1.44129 4.87868 0.87868C5.44129 0.316071 6.20435 0 7 0ZM14 9C14 12.53 11.39 15.44 8 15.93V19H6V15.93C2.61 15.44 0 12.53 0 9H2C2 10.3261 2.52678 11.5979 3.46447 12.5355C4.40215 13.4732 5.67392 14 7 14C8.32608 14 9.59785 13.4732 10.5355 12.5355C11.4732 11.5979 12 10.3261 12 9H14Z" fill="#F5D616"/>
                        </svg>}
                    </div>
                    <div className='tag position-absolute' style={{background: reply.sender_id !== userInfo.id? '#96A4FF' : '#F5D616' }}>

                    </div>
                
                    <div className='d-flex cancel justify-content-center align-items-center' onClick={()=> setReply(null)}>
                        X
                    </div>
                </div>
            </div>}
            {recording && 
                <div className='timer'>
                    <div>
                        <p>{minutes + ':' + seconds}</p>
                    </div>
                </div>
            }
            <div className='chatInput_cont px-3 pt-2 pb-4'>
                <div className='d-flex justify-content-between align-items-center'>
                    {audioUrl == null && <form action="" onSubmit={(e)=> e.preventDefault()} className='position-relative'>
                        <input value={text} onTouchStart={(e)=> e.preventDefault()} onChange={(e)=> setText(e.target.value)} type="text" className='py-3 rounded-pill pe-3' placeholder='Type message ...' />
                        <div className='position-absolute emojiF'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0C3.58187 0 0 3.58187 0 8C0 12.4181 3.58187 16 8 16C12.4181 16 16 12.4181 16 8C16 3.58187 12.4181 0 8 0ZM8 15.3333C3.95627 15.3333 0.666667 12.0437 0.666667 8C0.666667 3.95627 3.95627 0.666667 8 0.666667C12.0435 0.666667 15.3333 3.95627 15.3333 8C15.3333 12.0437 12.0435 15.3333 8 15.3333Z" fill="#3A3A3A" fillOpacity="0.8"/>
                            <path d="M4.93343 7.35786C5.66981 7.35786 6.26676 6.76091 6.26676 6.02453C6.26676 5.28815 5.66981 4.69119 4.93343 4.69119C4.19705 4.69119 3.6001 5.28815 3.6001 6.02453C3.6001 6.76091 4.19705 7.35786 4.93343 7.35786Z" fill="#3A3A3A" fillOpacity="0.8"/>
                            <path d="M11.0667 7.35786C11.8031 7.35786 12.4001 6.76091 12.4001 6.02453C12.4001 5.28815 11.8031 4.69119 11.0667 4.69119C10.3304 4.69119 9.7334 5.28815 9.7334 6.02453C9.7334 6.76091 10.3304 7.35786 11.0667 7.35786Z" fill="#3A3A3A" fillOpacity="0.8"/>
                            <path d="M12.2962 9.33866C11.1421 10.9672 9.77596 11.3771 7.99996 11.3771C6.22422 11.3771 4.85809 10.9675 3.70396 9.33866C3.54316 9.112 3.11996 9.25466 3.21356 9.58373C3.81969 11.7184 5.88022 12.9616 8.00022 12.9616C10.1202 12.9616 12.181 11.7184 12.7872 9.58373C12.8802 9.2544 12.457 9.112 12.2962 9.33866Z" fill="#3A3A3A" fillOpacity="0.8"/>
                            </svg>
                        </div>
                    </form>}
                    {
                    }
                    {audioUrl !== null && <div className='recorded px-3 d-flex align-items-center justify-content-between'>
                        <svg width="19" onClick={()=> setAudioUrl(null)} height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.33333 21.3333C1.33333 22.8 2.53333 24 4 24H14.6667C16.1333 24 17.3333 22.8 17.3333 21.3333V5.33333H1.33333V21.3333ZM18.6667 1.33333H14L12.6667 0H6L4.66667 1.33333H0V4H18.6667V1.33333Z" fill="#3D78CD"/>
                        </svg>
                        <Waveform ref={audioRef} src={audioUrl} />
                    </div>}
                    <div ref={audioBRef} className='audio ms-2 d-flex justify-content-center align-items-center' onClick={(text.length > 0 && !recording && audioUrl == null && !sending) ? sendMessage: (!(text.length > 0) && !recording && audioUrl == null && !sending) ? voiceRecord: (recording && audioUrl == null && !sending) ? stopRecording : sendRecord}>
                        {!(text.length > 0) && !recording && audioUrl == null &&  <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0C7.79565 0 8.55871 0.316071 9.12132 0.87868C9.68393 1.44129 10 2.20435 10 3V9C10 9.79565 9.68393 10.5587 9.12132 11.1213C8.55871 11.6839 7.79565 12 7 12C6.20435 12 5.44129 11.6839 4.87868 11.1213C4.31607 10.5587 4 9.79565 4 9V3C4 2.20435 4.31607 1.44129 4.87868 0.87868C5.44129 0.316071 6.20435 0 7 0ZM14 9C14 12.53 11.39 15.44 8 15.93V19H6V15.93C2.61 15.44 0 12.53 0 9H2C2 10.3261 2.52678 11.5979 3.46447 12.5355C4.40215 13.4732 5.67392 14 7 14C8.32608 14 9.59785 13.4732 10.5355 12.5355C11.4732 11.5979 12 10.3261 12 9H14Z" fill="#F5D616"/>
                        </svg>}

                        {recording && audioUrl == null &&
                        <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0C7.79565 0 8.55871 0.316071 9.12132 0.87868C9.68393 1.44129 10 2.20435 10 3V9C10 9.79565 9.68393 10.5587 9.12132 11.1213C8.55871 11.6839 7.79565 12 7 12C6.20435 12 5.44129 11.6839 4.87868 11.1213C4.31607 10.5587 4 9.79565 4 9V3C4 2.20435 4.31607 1.44129 4.87868 0.87868C5.44129 0.316071 6.20435 0 7 0ZM14 9C14 12.53 11.39 15.44 8 15.93V19H6V15.93C2.61 15.44 0 12.53 0 9H2C2 10.3261 2.52678 11.5979 3.46447 12.5355C4.40215 13.4732 5.67392 14 7 14C8.32608 14 9.59785 13.4732 10.5355 12.5355C11.4732 11.5979 12 10.3261 12 9H14Z" fill="red"/>
                        </svg>}



                        {(text.length > 0 && !recording && audioUrl == null ||!(text.length > 0) && !recording && audioUrl !== null) &&  <svg width="20" height="20" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.4815 0.197013L1.79528 12.4158C-0.36717 13.2844 -0.35466 14.4907 1.39854 15.0286L9.53366 17.5664L28.356 5.69073C29.246 5.14922 30.0591 5.44053 29.3907 6.03387L14.1409 19.7968H14.1374L14.1409 19.7985L13.5798 28.1839C14.4019 28.1839 14.7647 27.8068 15.2257 27.3618L19.1771 23.5194L27.3963 29.5904C28.9118 30.425 30.0001 29.9961 30.3772 28.1875L35.7726 2.7598C36.3249 0.545509 34.9273 -0.457087 33.4815 0.197013Z" fill="#F5D616"/>
                        </svg>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatInput
