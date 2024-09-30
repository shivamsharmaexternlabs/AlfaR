import React from 'react'

const OrderItemBtn = ({classNameProp,btnname}) => {
  return (
    <>
        <button type='button' className={classNameProp}>{btnname}</button>
    </>
  )
}

export default OrderItemBtn