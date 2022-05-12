import React from 'react'
import '../styles/posts.css'
import WriteCom from './WriteCom';
import Comment from './Comment';

class Posts extends React.Component {
    constructor() {
        super();
        this.state = {
            writeLine: [
                { com: false, child: [false, false, false], emoji: false },
                { com: false, child: [false, false, false], emoji: false },
                { com: false, child: [false, false, false], emoji: false }
            ],
            addComVal: '',
            comRate: 0,
        }
    }


    toggleReplyLine = (i, child_i = '') => {

        let showLine = this.state.writeLine;
        (child_i === '')
            ? showLine[i].com = !showLine[i].com
            : showLine[i].child[child_i] = !showLine[i].child[child_i];
        this.setState({ writeLine: showLine })

    }

    render() {
        const { items, addCom, levelAddedCom } = this.props;

        return <>
            {items.map((post, i) => {
                return <div key={`posts${i}`} className='post' style={{ opacity: post.disabled ? 0.5 : 1 }}>
                    <div>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                    </div>
                    <span className={'reply'} onClick={() => this.toggleReplyLine(i)}>Reply</span>
                    {this.state.writeLine[i].com
                        &&
                        <WriteCom
                            post_index={i}
                            addCom={addCom}
                            resetWriteLine={this.toggleReplyLine} />
                    }
                    <div className='comments'>
                        <Comment
                            comments={post.comments}
                            post_index={i}
                            levelAddedCom={levelAddedCom}
                            resetWriteLine={this.toggleReplyLine}
                            hasChild={true}
                            writeLine={this.state.writeLine} />
                    </div>

                </div>
            })
            }
        </>
    }
}

export default Posts