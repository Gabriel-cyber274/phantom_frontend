import React from 'react'
import { redirect } from 'next/navigation';
import axios from 'axios';
import { cookies } from 'next/headers';
import {environment} from '../../../environment/environment'
import api from '../../../components/api';
import Content from './Content'


async function page({params, searchParams}) {
    const nextCookies = cookies();
    if(nextCookies.get('token') === undefined && params.user.length > 4 || nextCookies.get('token') == null && params.user.length > 4) {
      redirect('/auth/login'+'/chat/'+params.user.join('/'));
    }
    else if(nextCookies.get('token') === undefined && params.user.length == 4 || nextCookies.get('token') == null && params.user.length == 4) {
        redirect('/auth/login')
    }

    // console.log(params.user);


    return (
        <div className='mainContentPage'>
            <Content params={params.user} />
        </div>
    )
}

export default page
