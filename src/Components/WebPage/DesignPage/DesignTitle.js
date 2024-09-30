import React, { useState } from 'react'
import back from '../../Astes/arrow.svg'
import Backbtn from './Backbtn';
import { useNavigate } from 'react-router-dom';

const   DesignTitle = ({tooglebtn}) => {

    // const navigat=useNavigate()
    const  [toggleData,setToggleData] = useState('Trending');
    const navigate = useNavigate()



    const ToggleButtonFun = (value) => {
        tooglebtn(value)
        setToggleData(value)
    }

    return (
        <>
            <div className='designTitle'>
                <Backbtn  />
                <div className='designTitlebtn'>
                    <button type='button' className={toggleData ===  'Trending' ? 'active' : ''} onClick={()=>ToggleButtonFun('Trending')}>Trending</button>
                    <button type='button' className={toggleData !==  'Trending' ? 'active' : '' } onClick={()=>ToggleButtonFun('Create')}>Create</button>
                </div>
            </div>
        </>
    )
}

export default DesignTitle