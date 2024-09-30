import React from 'react'

const OrderBtn = ({icon,name,classNameProp,ToggleOrderBtnFun1}) => {


  const ToggleOrderBtnFun = (value) => { 
    ToggleOrderBtnFun1(value)
  }

  
  return (
    <>
        <button type='button' className={classNameProp} onClick={()=>ToggleOrderBtnFun(name)}><img src={icon} alt='icon'/> {name} </button>
    </>
  )
}

export default OrderBtn