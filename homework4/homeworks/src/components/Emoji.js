import React from 'react'
import '../styles/emoji.css'
import emoji from '../data/emojiList';


export default function Emoji() {

    return <>
        <select className='emoji-name'>
            <option>Emoji</option>
            {emoji.map((ele, e_i) => <option key={`emoji${e_i}`} >{ele} </option>)}
        </select>
    </>
}
