import React, { useEffect } from 'react';
import Users from './Users';
import { Link } from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css';
const Home = () => {
    useEffect(() => {
        AOS.init({
            easing: 'ease-out-quart',
            delay: 0,
            duration: 750,
        })
    }, [])
    return (
        <div className='pt-16'>
            {/* Get Explore */}
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/gMkqhKH/time-management-marketers-teamwork-media-planning-media-representation-control-reach-your-client-bes.jpg)' }}>
                <div data-aos="fade-left" className="hero-overlay bg-opacity-10"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md ">

                        <Link to='/dashboard'><button className="btn mt-96 bg-white text-black">Get Explore</button></Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;