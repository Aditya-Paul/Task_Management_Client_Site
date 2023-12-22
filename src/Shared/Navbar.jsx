import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";
import { AuthContext } from '../Provider/Authprovider';
// import { AuthContext } from '../Provider/Authprovider';

const Navbar = () => {
    const { user, userlogout } = useContext(AuthContext)
    const navigate = useNavigate()
    console.log(user)

    const links1 = <>
        <li><Link className="text-black" to='/'>Home</Link></li>
        <li><Link className="text-black" to='/users'>Users</Link></li>
        <li><Link className="text-black" to='/dashboard'>Dashboard</Link></li>
        
        {
            user ?
                ""
                :
                <li><Link className="text-black" to='/login'>Login</Link></li>
        }
    </>
    const Userlogout = () =>{
        userlogout()
        navigate('/')
    }
    return (
        <div>
            <div data-aos="fade-left" className="navbar max-w-screen-xl fixed z-10 bg-opacity-10  bg-black text-white " >
                <div className="bg-opacity-60"></div>
                <div className="navbar-start gap-4">
                    <div className="dropdown ">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            <div className="flex-row text-green-400">
                                {

                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                        {links1}
                                    </ul>
                                }
                            </div>
                        </label>
                    </div>
                    

                </div>
                <div className="navbar-center hidden lg:flex">
                    {

                        <ul className="menu menu-horizontal px-1">
                            {links1}
                        </ul>
                    }
                </div>
                <div className="navbar-end gap-2">
                    {
                        user ?
                            <div className="flex flex-col md:flex-row  items-center gap-2">
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full border-2 border-gray-600">
                                            <img alt="" src={user.photoURL} />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                                        <li><a className="text-black">{user.displayName}</a></li>
                                        <button className="btn text-purple-300" onClick={Userlogout}><Link to='/'>Logout</Link>
                                        </button>
                                    </ul>
                                </div>

                            </div>
                            :
                            ""
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;