import React from 'react'

const ColorBtnGroup = ({Colorbtnname1,BgColor}) => {
    return (
        <>
            <button type='button' className='colorbtn'>
                <span style={{ background: BgColor }}></span>
                {Colorbtnname1}
            </button>
        </>
    )
}

export default ColorBtnGroup