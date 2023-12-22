import React from 'react';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div className='flex pt-24 md:pt-20'>
                <div className="w-64 min-h-screen border-4 border-pink-50 rounded-xl">
                    <ul className='menu'>
                        
                        <li>
                            <NavLink to='/dashboard/userprofile'>
                                User Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/createtask'>
                                Create Task</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/todo_list'>
                                To Do List</NavLink>
                        </li>
                        <li>
                            <NavLink to='/'>
                                Home</NavLink>
                        </li>

                    </ul>
                </div>
                <div className='flex-1 p-8'>
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;