import React from 'react'

export default function CommContent({ text, rate, classname }) {

    const color_rate = (rate < 3 && 'red') || ((rate >= 3 && rate <= 4) && 'yellow') || (rate > 4 && 'green')

    return <>
        <div className={`${classname}`} >
            <p className='text'>{text}</p>
            <p className='rate' style={{ color: color_rate }}>{rate}</p>
        </div>
    </>
}

