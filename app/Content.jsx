"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Nav from '@/components/nav';


function Content() {
  const router = useRouter();
  return (
    <div className='mainContentPage'>
      <Nav />
      <div className='first_sec mt-5'>
        <h1>Leaderboard</h1>
        <div className='mt-3 firstL'>
            <div className='thirdPlace'>
                <div className='frame position-relative'>
                    <div className='poss position-absolute'>1</div>
                </div>
                <h2>Francis</h2>
                <span><img src="/assets/coin.png" className='me-2' alt="" /> 1893</span>
            </div>
            <div className='firstPlace'>
                <div className='frame position-relative'>
                    <div className='poss position-absolute'>1</div>
                </div>
                <h2>Francis</h2>
                <span><img src="/assets/coin.png" className='me-2' alt="" /> 1893</span>
            </div>
            <div className='secondPlace'>
                <div className='frame position-relative'>
                    <div className='poss position-absolute'>1</div>
                </div>
                <h2>Francis</h2>
                <span><img src="/assets/coin.png" className='me-2' alt="" /> 1893</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Content