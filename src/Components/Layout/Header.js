import React from 'react'
import logo from '../Astes/logo.svg'
import icon2 from '../Astes/icon2.svg'
import Style from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import { routes } from '../utils/Constants'

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate(routes.ROOT);
  }

  return (
    <>
      <header className={`${Style.header}`}>
        <img src={logo} className='logoimg' alt='img' />
        <button type='button' className={`${Style.logoutbtn}`} onClick={() => handleLogout()}> <img src={icon2} alt='img' /> Logout</button>
      </header>
    </>
  )
}

export default Header