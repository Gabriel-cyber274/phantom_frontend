import React from 'react'
import Content from './Content'

function page({ params, searchParams }) {
    console.log(params.link)
    return (
        <div className='mainContentPage'>
            <Content />
        </div>
    )
}

export default page
