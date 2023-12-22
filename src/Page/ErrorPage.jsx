import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <div className='h-screen flex flex-col space-y-6 justify-center items-center'>
                <img src="https://i.ibb.co/TgZDM9J/download.jpg" alt="" />
                <Link to='/'><button className="btn btn-primary">Home</button></Link>
            </div>
            
        </div>
    );
};

export default ErrorPage;