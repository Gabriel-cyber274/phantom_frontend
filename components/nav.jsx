"use client"
import React from 'react'

function Nav() {
  return (
    <div className='nav_sec align-items-center d-flex justify-content-between px-3 py-3'>
        <div className='first_side'>
          <div className="first"></div>
          <div className="second my-1"></div>
          <div className="third"></div>
        </div>
        <h2>Homepage</h2>
        <img src="/assets/message.png" alt="" /> 
    </div>
  )
}

export default Nav