import React from 'react'
import logo from '../Astes/logowh.svg'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
      {/* <div className='hederpart'>
        <div>
          <img src={logo} alt='img' />
        </div>
        <ul className='menulist'>
          <li><NavLink to={'/home'}>Home</NavLink></li>
          <li><NavLink to={'/Design'}>Design</NavLink></li>
          <li><NavLink to={'/GeneratedDesign'}>Generated Design</NavLink></li>
          <li><NavLink to={'/Documentation'}>Documentation</NavLink></li>
          <li><NavLink to={'/Sample'}>Sample</NavLink></li>
          <li><NavLink to={'/Order'}>Order</NavLink></li>
          <li><NavLink to={'/Recycle'}>Recycle</NavLink></li>
        </ul>
        <button type='button' className='signinbtn'> Sign in </button>
      </div> */}
    </>
  )
}

export default Header