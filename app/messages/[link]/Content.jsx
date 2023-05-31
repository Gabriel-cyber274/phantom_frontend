import React from 'react'
import Nav from '../../../components/nav';
import Footer from '../../../components/footer';

function Content() {
    return (
        <div>
            <Nav text={'Messages'} />
                <div className='messagesPage'>
                    <h1>Good Responses</h1>
                    <h1>Bad Responses</h1>
                    <h1>Mixed Responses</h1>
                </div>
            <Footer />
        </div>
    )
}

export default Content
