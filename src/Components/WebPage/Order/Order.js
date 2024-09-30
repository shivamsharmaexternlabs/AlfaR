import React, { useState } from 'react'
import OrderBtnGroup from './OrderBtnGroup'
import OrderList from './OrderList'
import basket from '../../Astes/basket.svg'
import item4 from '../../Astes/item4.png'
import ConfirmOrder from './ConfirmOrder'
import TrackOrder from './TrackOrder'
import CreateOrder from './CreateOrder'
import Header from '../../Layout/Header'
import SignaturePad from "../ReusableComponents/SignaturePad"


const Order = () => {
  const [activeBtn, setActiveToggleBtn] = useState("Confirm Order")




  return (
    <>
    <Header/> 
      <div className='orderpage'>
        <OrderBtnGroup ActiveTabFun={setActiveToggleBtn} />

        {/* <CreateOrder />  */}
        
         {activeBtn === 'Confirm Order' &&
          <ConfirmOrder />}
          
        {activeBtn === 'Track Order' &&
          <TrackOrder />}
          
        {activeBtn === 'Create Order' &&
          <CreateOrder />} 

        {/* <ul className='orderlist'>
          <OrderList icon={basket} title={'Quote 1'} OredrTitle={'LuxeFit Polo Premium Range'} Fabric={'Denim'} size={'24 EU'} Color={'Green'}
            price={'USD 1000'} Qty={1} />
          <OrderList icon={basket} title={'Quote 2'} OredrTitle={`Nike Air More Uptempo '96'`} Fabric={'cotton'} size={'32 EU'}
            Color={'Blue'} price={'USD 1000'} Qty={2} />
        </ul> */}
        {/* <SignaturePad/> */}

      </div>
    </>
  )
}

export default Order