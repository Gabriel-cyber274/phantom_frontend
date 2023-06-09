"use client"
import './globals.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { Inter, Sansita } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: '400' })

// const sansation = Sansita({ subsets: ['latin'], weight: '700' });

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  
  // useEffect(() => {
  //   require("bootstrap/dist/js/bootstrap.bundle.min")
  // }, []);

  return (
    <html lang="en">
      <head>
        {/* <meta name="csrf-token" content="{{ csrf_token() }}" /> */}
        <title>phantom</title>
        <meta name="description" content="Phantom application" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <meta name="title" content="Phantom" />
        {/* <meta name="author" content="Gtec" /> */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
