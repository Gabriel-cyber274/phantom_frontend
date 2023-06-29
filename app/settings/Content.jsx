"use client"
import React, {useEffect} from 'react'
import Footer from '../../components/footer';
import Nav from '../../components/nav';
import avatars from '../../components/avatars'
import { ToastContainer, toast } from 'react-toastify';


function Content() {

    const notify_err = (res) => toast.error(res, { theme: "colored" });
    const notify = (res)=> {
      toast.success(res, { theme: "colored" })
    } 
    
    // useEffect(() => {
        
    //     // console.log(JSON.parse(localStorage.currentUser).user.id)

    // }, [])

    const copyInvite = ()=> {
        let url = `https://phantom-frontend-651g.vercel.app/auth/register?invite_id=${JSON.parse(localStorage.currentUser).user.id}`
        navigator.clipboard.writeText(url)
        .then(() => {
        notify('Invite link copied to clipboard');
        })
        .catch((error) => {
        console.error('Error copying text:', error);
        });
    }
    return (
        <div>
            <Nav text={'User Profile'} />
            <div className='settingsP pb-4 pt-3 d-flex justify-content-center align-items-center'>
                <div className='avatarSec d-flex flex-column align-items-center'>
                    <div className='circleA position-relative'>
                        {(localStorage.currentUser !== undefined || localStorage.currentUser !== null) && <img src={avatars[JSON.parse(localStorage.currentUser).user.avatar_id]} alt=""/>}
                        <div className='position-absolute edit d-flex justify-content-center align-items-center'>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.26 3.60102L9.398 0.740018C9.32862 0.670565 9.24623 0.615468 9.15555 0.577876C9.06487 0.540284 8.96766 0.520935 8.8695 0.520935C8.77133 0.520935 8.67413 0.540284 8.58344 0.577876C8.49276 0.615468 8.41037 0.670565 8.341 0.740018L0.520996 8.56102V12.479H4.44L12.26 4.65902C12.3295 4.58956 12.3846 4.50709 12.4222 4.41632C12.4598 4.32555 12.4792 4.22827 12.4792 4.13002C12.4792 4.03177 12.4598 3.93448 12.4222 3.84372C12.3846 3.75295 12.3295 3.67048 12.26 3.60102ZM3.884 10.984H2.016V9.11502L2.048 9.08302L3.921 10.952L3.884 10.984Z" fill="#1E1E1E"/>
                            </svg>
                        </div>
                    </div>
                    <h2 className='mt-3 mb-2'>{JSON.parse(localStorage.currentUser)?.user.name}</h2>
                    <h5>{JSON.parse(localStorage.currentUser)?.user.location}</h5>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <div className='settingsMain'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex align-items-center'>
                            <div className='editCover d-flex justify-content-center align-items-center'>
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.633 12.479C17.5998 11.498 18.2549 10.253 18.5162 8.9007C18.7775 7.54838 18.6331 6.149 18.1014 4.87846C17.5696 3.60791 16.6742 2.5229 15.5276 1.7598C14.381 0.996706 13.0344 0.589569 11.657 0.589569C10.2797 0.589569 8.9331 0.996706 7.78649 1.7598C6.63988 2.5229 5.74442 3.60791 5.21267 4.87846C4.68092 6.149 4.5366 7.54838 4.79786 8.9007C5.05911 10.253 5.71429 11.498 6.68103 12.479C4.85581 13.1963 3.28837 14.4457 2.18223 16.065C1.07608 17.6844 0.482318 19.5989 0.478027 21.56C0.478027 21.9313 0.625527 22.2874 0.888078 22.5499C1.15063 22.8125 1.50672 22.96 1.87803 22.96H21.437C21.8083 22.96 22.1644 22.8125 22.427 22.5499C22.6895 22.2874 22.837 21.9313 22.837 21.56C22.8327 19.5988 22.2387 17.6842 21.1324 16.0648C20.0261 14.4454 18.4584 13.1961 16.633 12.479ZM7.46403 7.587C7.46403 9.902 7.46703 5.273 7.46403 7.587V7.587Z" fill="#F9368B"/>
                                </svg>
                            </div>
                            <h2 className='ms-5'>Edit Profile</h2>
                        </div>
                        <div>
                            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.21002 0.798004L0.0720215 1.936L5.90903 7.773L0.0720215 13.61L1.21002 14.748L8.14902 7.773L1.21002 0.798004Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    <hr/>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex align-items-center'>
                            <div className='inviteCover position-relative d-flex justify-content-center align-items-center'>
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.633 12.315C17.5998 11.334 18.2549 10.0891 18.5162 8.73673C18.7775 7.38441 18.6331 5.98503 18.1014 4.71449C17.5696 3.44394 16.6742 2.35893 15.5276 1.59583C14.381 0.832735 13.0344 0.425598 11.657 0.425598C10.2797 0.425598 8.9331 0.832735 7.78649 1.59583C6.63988 2.35893 5.74442 3.44394 5.21267 4.71449C4.68092 5.98503 4.5366 7.38441 4.79786 8.73673C5.05911 10.0891 5.71429 11.334 6.68103 12.315C4.85581 13.0323 3.28837 14.2817 2.18223 15.9011C1.07608 17.5204 0.482318 19.4349 0.478027 21.396C0.478027 21.7673 0.625527 22.1234 0.888078 22.386C1.15063 22.6485 1.50672 22.796 1.87803 22.796H21.437C21.8083 22.796 22.1644 22.6485 22.427 22.386C22.6895 22.1234 22.837 21.7673 22.837 21.396C22.8327 19.4348 22.2387 17.5202 21.1324 15.9009C20.0261 14.2815 18.4584 13.0321 16.633 12.315ZM7.46403 7.42303C7.46403 9.73803 7.46703 5.10903 7.46403 7.42303V7.42303Z" fill="#1D1D1D"/>
                                </svg>
                                <span className='position-absolute'>+</span>
                            </div>
                            <h2 className='ms-5'>Invite a friend</h2>
                        </div>
                        <div className='d-flex align-items-end'>
                            <h6 className='me-2 copy_settings' onClick={copyInvite}>Copy link</h6>
                            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.21002 0.798004L0.0720215 1.936L5.90903 7.773L0.0720215 13.61L1.21002 14.748L8.14902 7.773L1.21002 0.798004Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> 
            <ToastContainer />
        </div>
    )
}

export default Content
