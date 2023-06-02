import React from 'react'
import Content from './Content'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


function page() {
    const nextCookies = cookies();
    if(nextCookies.get('token') === undefined || nextCookies.get('token') == null) {
      redirect('/auth/login');
    }
    return (
        <div className='mainContentPage'>
            <Content />
        </div>
    )
}

export default page
