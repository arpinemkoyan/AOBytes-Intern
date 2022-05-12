import React from 'react'
import '../styles/comment.css'
import WriteCom from './WriteCom';
import CommContent from './CommContent';
import Emoji from './Emoji';

class Comment extends React.Component {

    render() {
        const { comments, post_index, levelAddedCom, resetWriteLine } = this.props;

        return <>
            {comments.map((com, index) => {
                return <div key={`com${index + 1}`} >
                    <div className={'comments-content'}>
                        <CommContent
                            classname={'comment'}
                            text={com.text}
                            rate={com.rate} />
                        <Emoji />
                        {this.props.hasChild && <span onClick={() => {
                            resetWriteLine(post_index, index)
                        }}>Reply</span>}
                        {this.props.hasChild && this.props.writeLine[post_index].child[index]
                            &&
                            <WriteCom
                                post_index={post_index}
                                child_index={index}
                                levelAddedCom={levelAddedCom}
                                resetWriteLine={resetWriteLine} />
                        }
                    </div>
                    {com.children.length > 0 &&
                        com.children.map((child, ind) => {
                            return <CommContent key={`child${ind}`}
                                classname={'child-comment'}
                                text={child.text}
                                rate={child.rate} />
                        })
                    }
                </div>
            })}
        </>
    }

}

export default Comment