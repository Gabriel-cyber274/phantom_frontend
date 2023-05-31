import React from 'react'
import Content from '../Content'

function page({params}) {
    console.log(params.link.join('/'));
    return (
        <div>
            <Content link={params.link.join('/')} />
        </div>
    )
}

export default page
