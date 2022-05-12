import React from 'react'
import posts from './post-comm';
import './pool.css'

class Pool extends React.Component {

    render() {
        return <>
            <div className='pool'>

                {posts.map((post, index) => {
                    return <div key={`post${index + 1}`} className='post' style={{ opacity: post.disabled ? 0.5 : 1 }}>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                        <div className='comments'>
                            {post.comments.map((com, index) => {
                                return <div className='comment' key={`com${index + 1}`}>
                                    <p>{com.text}</p>
                                    <p>{com.rate}</p>
                                </div>
                            })}
                        </div>
                    </div>
                })
                }

            </div >
        </>
    }
}

export default Pool