import React from 'react'
import Header from './Header'
import Sidebar from '../WebPage/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom';


const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className='dasboardpage'>
                <Sidebar />
                {/* {children} */}
                <Outlet />
            </div>

        </>
    )
}

export default Layout