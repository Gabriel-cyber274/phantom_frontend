"use client"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

function layout({ children }) {
    return (
        <div>
            {children}
            <ToastContainer />
        </div>
    )
}

export default layout