"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import api from './api'
import { getCookie } from 'cookies-next';


const useRequestQueue = () => {
  const [queue, setQueue] = useState([]);
  const [isProcessing, setProcessing] = useState(false);
  let token = getCookie('token');

  const addRequest = (request) => {
    setQueue((prevQueue) => [...prevQueue, request]);
  };

  const processQueue = async () => {
    if (!isProcessing && queue.length > 0) {
      setProcessing(true);
      const request = queue[0];
      try {
        let res = await api(environment.room.recievedRooms, {
            headers: {
                'Content-Type' : 'applications/json',
                'Authorization': `Bearer ${token}`
            },
        });

        console.log(res, 'testing')
      } catch (error) {
        console.error('Error processing request:', error);
      }
      setQueue((prevQueue) => prevQueue.slice(1));
      setProcessing(false);
    }
  };

  useEffect(() => {
    processQueue();
  }, [queue]);

  return { addRequest };
};

export default useRequestQueue;

















