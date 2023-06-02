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
                    'Content-Type' : 'applications/json',
                    'Authorization': `Bearer ${token}`
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
                                    <h2>{displayData[2].name}</h2>
                                    <span className='d-flex align-items-center'><img src="/assets/coin.png" className='me-1' alt="" />{displayData[2].points}</span>
                                </>}
                            </div>
                            <div className='firstPlace d-flex flex-column align-items-center'>
                                {displayData.length >= 1 && 
                                <>
                                    <div className='frame position-relative'>
                                        <div className='poss d-flex justify-content-center align-items-center position-absolute'>1</div>
                                    </div>
                                    <h2>{displayData[0].name}</h2>
                                    <span className='d-flex align-items-center'><img src="/assets/coin.png" className='me-1' alt="" />{displayData[0].points}</span>
                                </>}
                            </div>
                            <div className='secondPlace d-flex flex-column align-items-center'>
                                {displayData.length >= 2 &&
                                <>
                                    <div className='frame position-relative'>
                                        <div className='poss d-flex justify-content-center align-items-center position-absolute'>2</div>
                                    </div>
                                    <h2>{displayData[1].name}</h2>
                                    <span className='d-flex align-items-center'><img src="/assets/coin.png" className='me-1' alt="" />{displayData[1].points}</span>
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
                                        <h3>{user.name}</h3>
                                        <h4 className='d-flex align-items-center'><img src="/assets/coin.png" alt=""/>{user.points}</h4>
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
                                        <h3>{user.name}</h3>
                                        <h4 className='d-flex align-items-center'><img src="/assets/coin.png" alt=""/>{user.points}</h4>
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
                                        <h3>{user.name}</h3>
                                        <h4 className='d-flex align-items-center'><img src="/assets/coin.png" alt=""/>{user.points}</h4>
                                    </div>
                                </div>
                            ))
                        }


                        {displayData.length > 22 && displayData.slice(3, 20).filter(user=> user.id == JSON.parse(localStorage.currentUser).user.id).length == 0  && 
                            <div className='second me mt-3 d-flex justify-content-between'>
                                <h2>{displayData.findIndex(user=> user.id == JSON.parse(localStorage.currentUser).user.id)+1}</h2>
                                <div className='d-flex back justify-content-between align-items-center'>
                                    <span></span>
                                    <h3>{displayData.filter(user=> user.id == JSON.parse(localStorage.currentUser).user.id)[0].name}</h3>
                                    <h4 className='d-flex align-items-center'><img src="/assets/coin.png" alt=""/>{displayData.filter(user=> user.id == JSON.parse(localStorage.currentUser).user.id)[0].points}</h4>
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
