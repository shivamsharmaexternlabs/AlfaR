import React, { useEffect, useLayoutEffect, useState } from 'react'
import location from '../../Astes/location.svg'
import basket from '../../Astes/basket.svg'
import cart from '../../Astes/cart-add.svg'
import OrderBtn from './OrderBtn'
import { useLocation, useNavigate } from 'react-router-dom'

const OrderBtnGroup = ({ ActiveTabFun }) => {

  const [activeBtn, setActiveBtn] = useState("")

  const navigate = useNavigate()
  const locationPath = useLocation()

  const ToggleOrderBtnFun1 = (value) => {
    // navigate("#create-order") 
    if (value == "Create Order") {
      navigate("/order#create-order")
      setActiveBtn(value)
      ActiveTabFun(value)
    }
    else  if (value == "Confirm Order") {
      navigate("/order#confirm-order")
      setActiveBtn(value)
      ActiveTabFun(value)
    }
    else  if (value == "Track Order") {
      navigate("/order#track-order")
      setActiveBtn(value)
      ActiveTabFun(value)
    }

   }
 

  useLayoutEffect(() => {

    if (locationPath?.hash) {

      if (locationPath?.hash == "#create-order") {
        setActiveBtn("Create Order")
        ActiveTabFun("Create Order")
      }
      else if (locationPath?.hash == "#confirm-order") {
        setActiveBtn("Confirm Order")
        ActiveTabFun("Confirm Order")
      }
      else if (locationPath?.hash == "#track-order") {
        setActiveBtn("Track Order")
        ActiveTabFun("Track Order")
      }
    }




  }, [locationPath?.hash])


  return (
    <>
      <div className='orderbtngroup'>
        <OrderBtn icon={cart} classNameProp={activeBtn == "Create Order" ? "active" : ""} name={'Create Order'} ToggleOrderBtnFun1={ToggleOrderBtnFun1} />
        <OrderBtn icon={basket} classNameProp={activeBtn == "Confirm Order" ? "active" : ""} name={'Confirm Order'} ToggleOrderBtnFun1={ToggleOrderBtnFun1} />
        <OrderBtn icon={location} classNameProp={activeBtn == "Track Order" ? "active" : ""} name={'Track Order'} ToggleOrderBtnFun1={ToggleOrderBtnFun1} />



      </div>

    </>
  )
}

export default OrderBtnGroup