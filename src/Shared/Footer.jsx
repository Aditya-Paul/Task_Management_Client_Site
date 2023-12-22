import React from 'react';
import { FaSquareTwitter,FaSquareYoutube,FaFacebookF   } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center p-10 bg-white text-black">
                <aside>
                    <p className="font-bold">
                        Task Mangement <br />
                    </p>
                    <p>Copyright © 2023 - All right reserved</p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        
                        <div className="grid grid-flow-col gap-4 items-center">
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
                           
                        <FaSquareTwitter className='w-10 h-10'> </FaSquareTwitter>
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <FaSquareYoutube  className='w-10 h-10'> </FaSquareYoutube >
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <FaFacebookF  className='w-10 h-10'> </FaFacebookF >
                        </a>
                    </div>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;