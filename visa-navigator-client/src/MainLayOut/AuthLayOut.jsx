import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer';
import Navbar from '../Component/Navbar';

const AuthLayOut = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <div className='min-h-[calc(100vh-208px)] container mx-auto'>
            <Outlet></Outlet>
            </div>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayOut;