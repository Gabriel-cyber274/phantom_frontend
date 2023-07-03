"use client"
import React, {useState, useEffect} from 'react'
import Footer from '../../components/footer';
import Nav from '../../components/nav';
import api from '../../components/api'
import {environment} from '../../environment/environment'
import { getCookie } from 'cookies-next';
import { ToastContainer, toast } from 'react-toastify';



function Content() {
    let token = getCookie('token');
    const [loading, setLoading] = useState(true);
    const [all, setAll] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const [weekly, setWeekly] = useState([]);
    const [active, setActive] = useState('MONTH');
    const [displayData, setDisplayData] = useState([]);

    const makeActive = (e)=> {
        let h3 = document.querySelectorAll('.leaderTypes h3')
        for (let i = 0; i < h3.length; i++) {
            h3[i].classList.remove('active');  
            h3[i].classList.remove('rounded-pill');  
        }
        e.target.classList.add('active');
        e.target.classList.add('rounded-pill');
        if(e.target.textContent == 'MONTH') {
            setDisplayData(monthly);
        }else if (e.target.textContent == 'ALL TIME') {
            setDisplayData(all);
        }else {
            setDisplayData(weekly);
        }
    }

    
    const notify_err = (res) => toast.error(res, { theme: "colored" });
    const notify = (res)=> {
        toast.success(res, { theme: "colored" })
    } 
    
    const getReviews = async()=> {
        try {
            const res = await api.get(environment.reviews.main, {
                headers: {
                    'Content-Type' : 'multipart/form-data; boundary=<calculated when request is sent>',
                    'Accept' : 'applications/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if(res.data.success) {
                setLoading(false);
                setAll(res.data.all);
                setDisplayData(res.data.monthly)
                setMonthly(res.data.monthly)
                setWeekly(res.data.weekly);
            }

        } catch (error) {
            // notify_err('error')
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(()=> {
        getReviews();
    }, []);

    return (
        <div>
            
            {loading && 
                <div className='loadingRoom d-flex justify-content-center align-items-center'>
                    <div className="spinner-border text-primary" role="status">
                    </div>
                </div>
            }

            {!loading && 
                <>
                    <Nav text={'Leaderboard'} />   
                    <div className='first_sec leaderSide position-relative'>
                        <div className='mt-3 firstL pt-4 pb-5 d-flex align-items-end justify-content-around px-3'>
                            <div className='thirdPlace d-flex flex-column align-items-center'>
                                {displayData.length >= 3 && 
                                <>
                                    <div className='frame position-relative'>
                                        <div className='poss d-flex justify-content-center align-items-center position-absolute'>3</div>
                                    </div>
                                    <h2>{displayData[2].name.includes(' ')? displayData[2].name.slice(0, displayData[2].name.indexOf(' ')) : displayData[2].name}</h2>
                                    <span className='d-flex align-items-center'><svg className='me-1' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10Z" fill="#FFDE07"/>
                                    <path d="M5 8.75C7.07107 8.75 8.75 7.07107 8.75 5C8.75 2.92893 7.07107 1.25 5 1.25C2.92893 1.25 1.25 2.92893 1.25 5C1.25 7.07107 2.92893 8.75 5 8.75Z" stroke="#505050" stroke-width="0.5"/>
                                    </svg>{displayData[2].points}</span>
                                </>}
                            </div>
                            <div className='firstPlace d-flex flex-column align-items-center'>
                                {displayData.length >= 1 && 
                                <>
                                    <div className='frame position-relative'>
                                        <div className='poss d-flex justify-content-center align-items-center position-absolute'>1</div>
                                    </div>
                                    <h2>{displayData[0].name.includes(' ')? displayData[0].name.slice(0, displayData[0].name.indexOf(' ')) : displayData[0].name}</h2>
                                    <span className='d-flex align-items-center'>
                                    <svg className='me-1' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 13C10.0899 13 13 10.0899 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13Z" fill="#FFDE07"/>
                                    <path d="M6.5 10.75C8.84721 10.75 10.75 8.84721 10.75 6.5C10.75 4.15279 8.84721 2.25 6.5 2.25C4.15279 2.25 2.25 4.15279 2.25 6.5C2.25 8.84721 4.15279 10.75 6.5 10.75Z" stroke="#505050" stroke-width="0.5"/>
                                    </svg>
                                    {displayData[0].points}</span>
                                </>}
                            </div>
                            <div className='secondPlace d-flex flex-column align-items-center'>
                                {displayData.length >= 2 &&
                                <>
                                    <div className='frame position-relative'>
                                        <div className='poss d-flex justify-content-center align-items-center position-absolute'>2</div>
                                    </div>
                                    <h2>{displayData[1].name.includes(' ')? displayData[1].name.slice(0, displayData[1].name.indexOf(' ')) : displayData[1].name}</h2>
                                    <span className='d-flex align-items-center'>
                                    <svg className='me-1' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10Z" fill="#FFDE07"/>
                                    <path d="M5 8.75C7.07107 8.75 8.75 7.07107 8.75 5C8.75 2.92893 7.07107 1.25 5 1.25C2.92893 1.25 1.25 2.92893 1.25 5C1.25 7.07107 2.92893 8.75 5 8.75Z" stroke="#505050" stroke-width="0.5"/>
                                    </svg>
                                    {displayData[1].points}</span>
                                </>}
                            </div>
                        </div>
                        {displayData.length == 0 &&
                            <div className='emptyBoardT d-flex align-items-center justify-content-center position-absolute'>
                                <h2 className='text-white'>empty</h2>
                            </div>
                        }
                    </div>
                    <div className='leaderTypes mt-5 mb-3 rounded-pill'>
                        <h3 className='py-2' onClick={makeActive}>WEEK</h3>
                        <h3 className='active rounded-pill py-2' onClick={makeActive}>MONTH</h3>
                        <h3 className='py-2' onClick={makeActive}>ALL TIME</h3>
                    </div>
                    {displayData.length > 1 && <div className='otheRanks'>
                        <div className='first'>
                            <h5>Rank</h5>
                            <h5>User</h5>
                            <h5>Points</h5>
                        </div>
                        {displayData.length > 22 && displayData.slice(3, 20).filter(user=> user.id == JSON.parse(localStorage.currentUser).user.id).length > 0 && 
                            displayData.slice(3, 20).map((user, idx)=> (
                                <div key={idx} className={`${user.id == JSON.parse(localStorage.currentUser).user.id && 'me'} second mt-3 d-flex justify-content-between`}>
                                    <h2>{idx + 4}</h2>
                                    <div className='d-flex back justify-content-between align-items-center'>
                                        <span></span>
                                        <h3>{user.name.includes(' ')? user.name.slice(0, user.name.indexOf(' ')) : user.name}</h3>
                                        <h4 className='d-flex align-items-center'><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.5 18C14.7467 18 19 13.9706 19 9C19 4.02944 14.7467 0 9.5 0C4.25329 0 0 4.02944 0 9C0 13.9706 4.25329 18 9.5 18Z" fill="#FFDE07"/>
                                        <path d="M9.5 15.75C13.5041 15.75 16.75 12.7279 16.75 9C16.75 5.27208 13.5041 2.25 9.5 2.25C5.49594 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.49594 15.75 9.5 15.75Z" stroke="#505050" stroke-width="0.5"/>
                                        </svg>
                                        {user.points}</h4>
                                    </div>
                                </div>
                            ))
                        }

                        {displayData.length > 22 && displayData.slice(3, 20).filter(user=> user.id == JSON.parse(localStorage.currentUser).user.id).length == 0 && 
                            displayData.slice(3, 20).map((user, idx)=> (
                                <div key={idx} className={`second mt-3 d-flex justify-content-between`}>
                                    <h2>{idx + 4}</h2>
                                    <div className='d-flex back justify-content-between align-items-center'>
                                        <span></span>
                                        <h3>{user.name.includes(' ')? user.name.slice(0, user.name.indexOf(' ')) : user.name}</h3>
                                        <h4 className='d-flex align-items-center'><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.5 18C14.7467 18 19 13.9706 19 9C19 4.02944 14.7467 0 9.5 0C4.25329 0 0 4.02944 0 9C0 13.9706 4.25329 18 9.5 18Z" fill="#FFDE07"/>
                                        <path d="M9.5 15.75C13.5041 15.75 16.75 12.7279 16.75 9C16.75 5.27208 13.5041 2.25 9.5 2.25C5.49594 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.49594 15.75 9.5 15.75Z" stroke="#505050" stroke-width="0.5"/>
                                        </svg>
                                        {user.points}</h4>
                                    </div>
                                </div>
                            ))
                        }

                        {displayData.length > 3 && displayData.length <= 22 && 
                            displayData.slice(3, 20).map((user, idx)=> (
                                <div key={idx} className={`${user.id == JSON.parse(localStorage.currentUser).user.id && 'me'} second mt-3 d-flex justify-content-between`}>
                                    <h2>{idx + 4}</h2>
                                    <div className='d-flex back justify-content-between align-items-center'>
                                        <span></span>
                                        <h3>{user.name.includes(' ')? user.name.slice(0, user.name.indexOf(' ')) : user.name}</h3>
                                        <h4 className='d-flex align-items-center'><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.5 18C14.7467 18 19 13.9706 19 9C19 4.02944 14.7467 0 9.5 0C4.25329 0 0 4.02944 0 9C0 13.9706 4.25329 18 9.5 18Z" fill="#FFDE07"/>
                                        <path d="M9.5 15.75C13.5041 15.75 16.75 12.7279 16.75 9C16.75 5.27208 13.5041 2.25 9.5 2.25C5.49594 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.49594 15.75 9.5 15.75Z" stroke="#505050" stroke-width="0.5"/>
                                        </svg>
                                        {user.points}</h4>
                                    </div>
                                </div>
                            ))
                        }


                        {displayData.length > 22 && displayData.slice(3, 20).filter(user=> user.id == JSON.parse(localStorage.currentUser).user.id).length == 0  && 
                            <div className='second me mt-3 d-flex justify-content-between'>
                                <h2>{displayData.findIndex(user=> user.id == JSON.parse(localStorage.currentUser).user.id)+1}</h2>
                                <div className='d-flex back justify-content-between align-items-center'>
                                    <span></span>
                                    <h3>{displayData.filter(user=> user.id == JSON.parse(localStorage.currentUser).user.id)[0].name.includes(' ')? displayData.filter(user=> user.id == JSON.parse(localStorage.currentUser).user.id)[0].name.slice(0, displayData.filter(user=> user.id == JSON.parse(localStorage.currentUser).user.id)[0].name.indexOf(' ')) : displayData.filter(user=> user.id == JSON.parse(localStorage.currentUser).user.id)[0].name}</h3>
                                    <h4 className='d-flex align-items-center'><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.5 18C14.7467 18 19 13.9706 19 9C19 4.02944 14.7467 0 9.5 0C4.25329 0 0 4.02944 0 9C0 13.9706 4.25329 18 9.5 18Z" fill="#FFDE07"/>
                                    <path d="M9.5 15.75C13.5041 15.75 16.75 12.7279 16.75 9C16.75 5.27208 13.5041 2.25 9.5 2.25C5.49594 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.49594 15.75 9.5 15.75Z" stroke="#505050" stroke-width="0.5"/>
                                    </svg>
                                    {displayData.filter(user=> user.id == JSON.parse(localStorage.currentUser).user.id)[0].points}</h4>
                                </div>
                            </div>
                        }

                    </div>}
                    <Footer />
                </>
            }
            <ToastContainer />
        </div>
    )
}

export default Content
