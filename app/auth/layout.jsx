import React from 'react'

function layout({children}) {
  return (
    <>
        <div className='main_auth_cont'>
            <div className='authbg'>
                <div className='first'>
                    <img src="/assets/design.png" alt="" />
                </div>
            </div>
            {children}
        </div>
    </>
  )
}

export default layout