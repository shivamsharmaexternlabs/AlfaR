import React from 'react'
import basket from '../../Astes/basket.svg'
import item4 from '../../Astes/item4.png'
import OrderItemBtn from './OrderItemBtn'

const OrderList = ({title,icon, OredrTitle, size, Fabric, Color,Qty, price}) => {
    return ( 
        <>
            <li>
                <h2><img src={icon} alt='basket icon' />{title}</h2>
                <div className='orderitembox'>
                    <div className='orderitem'>
                        <img src={item4} alt='item4' />
                    </div>
                    <div className='orderitemInfo'>
                        <h3>{OredrTitle}</h3>
                        <ul> <li>{Color}</li><li>Size : {size} </li> <li>Fabric : {Fabric} </li> </ul>
                        <h4>Qty : {Qty}</h4>
                    </div>
                    <div className='price'>
                        <h5>{price}</h5>
                    </div>
                </div>

                <div className='orderitembtn'>
                    <OrderItemBtn classNameProp={'revicebtn'} btnname={'Revice'} />
                    <OrderItemBtn classNameProp={'confirmbtn'} btnname={'Confirm'} />
                </div>  
            </li>
        </>
    )
}

export default OrderList