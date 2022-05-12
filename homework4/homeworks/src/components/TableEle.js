import React from 'react'
import '../styles/table.css'

export default function TableEle({ list, table_name, remove }) {

    return <>
        {list.map((post, index) => {
            const rate = Math.round(post.avgM * 100) / 100;
            const color_rate = (rate < 3 && 'red') || ((rate >= 3 && rate <= 4) && 'yellow') || (rate > 4 && 'green')

            return <div className='list-ele' key={`post${index}`}>
                <h3>{post.title}</h3>
                <div className='list-ele-right'>
                    <p style={{ color: color_rate }}>{rate}</p><button onClick={() => remove(post.title, table_name)}>-</button>
                </div>
            </div>
        })}

    </>
}
