import React, { useState } from 'react'
 import DesignSiderbar from './DesignSiderbar'
import DesignTitle from './DesignTitle'

import Tranding from './Tranding'
import Create from './Create'
import Header from '../../Layout/Header'
import { useNavigate } from 'react-router-dom'

const Design = () => {
    const  [toggleData,setToggleData] = useState('Trending')


    const navigate = useNavigate();


    const tooglebtn=(value)=>{
        console.log("cmsndbvsdv",value)
        setToggleData(value) 
 
    }   
    console.log("mbnfsdvds",toggleData)

    return (
        <>
            <Header />
            <div className='content'>
                <DesignSiderbar  activeTabValue={toggleData}/>
                <div className='rightpart'>
                    <DesignTitle tooglebtn={tooglebtn} />
                    {toggleData ===  'Trending' ?    <Tranding />: <Create />}
                </div>
            </div>
        </>
    )
}

export default Design