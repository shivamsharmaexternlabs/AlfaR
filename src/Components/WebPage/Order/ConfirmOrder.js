import React from 'react'
import OrderList from './OrderList'
import basket from '../../Astes/basket.svg'
import item4 from '../../Astes/item4.png'

const ConfirmOrder = () => {
    return (
        <>
            <ul className='orderlist'>
                <OrderList icon={basket} title={'Quote 1'} OredrTitle={'LuxeFit Polo Premium Range'} Fabric={'Denim'} size={'24 EU'} Color={'Green'}
                    price={'USD 1000'} Qty={1} />
                <OrderList icon={basket} title={'Quote 2'} OredrTitle={`Nike Air More Uptempo '96'`} Fabric={'cotton'} size={'32 EU'}
                    Color={'Blue'} price={'USD 1000'} Qty={2} />
                <OrderList icon={basket} title={'Quote 2'} OredrTitle={`Nike Air More Uptempo '96'`} Fabric={'cotton'} size={'32 EU'}
                    Color={'Blue'} price={'USD 1000'} Qty={2} />
                <OrderList icon={basket} title={'Quote 2'} OredrTitle={`Nike Air More Uptempo '96'`} Fabric={'cotton'} size={'32 EU'}
                    Color={'Blue'} price={'USD 1000'} Qty={2} />
            </ul>
        </>
    )
}

export default ConfirmOrder