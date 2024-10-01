import React, { useState } from 'react'
import Style from './Sidebar.module.css'
import { NavLink } from 'react-bootstrap'
import icon1 from '../../Astes/icon1.svg'
import icon3 from '../../Astes/icon3.svg'
import icon5 from '../../Astes/icon5.svg'
import icon4 from '../../Astes/icon4.svg'
import icon6 from '../../Astes/icon6.svg'

const Sidebar = () => {
  const [active,setActive] = useState(false)
  const menuActive = () => {
    setActive(true)
  }
  



  return (
    <>
    
      <div className={`${Style.sidebar}`}>
        <ul>
          <li><NavLink to='/admin' onClick={()=> menuActive()}>  Customers </NavLink> </li>
          <li><NavLink onClick={()=> menuActive()}>  Users </NavLink> </li>
          <li><NavLink onClick={()=> menuActive()} > Profile </NavLink> </li>
        </ul>
      </div>
    
    </> 
  )
}

export default Sidebar