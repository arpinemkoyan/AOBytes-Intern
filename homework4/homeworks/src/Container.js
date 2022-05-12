import React from 'react'
import posts from './post-comm';
import Pool from './Pool';
import './container.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import ImportExportIcon from '@mui/icons-material/ImportExport';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table1: [],
            table2: [],
            increment1: false,
            increment2: false,

        };
    }

    colculatAvgMark = () => {
        let arr = []
        posts.forEach(post => {
            let sun = 0, avgMark = 0;
            post.comments.forEach(com => {
                sun += com.rate
            })
            avgMark = sun / post.comments.length;
            arr.push({ title: post.title, avgM: avgMark })

        });
        arr = arr.sort((a, b) => {
            return b.avgM - a.avgM
        })

        return arr;
    }


    addPostT1 = () => {
        let arr = this.colculatAvgMark()
        if (this.state.table1.length > 0) {
            const results = arr.filter(({ avgM: id1 }) => !this.state.table1.some(({ avgM: id2 }) => id2 === id1));
            const diff = results.filter(({ avgM: id1 }) => !this.state.table2.some(({ avgM: id2 }) => id2 === id1));

            posts[posts.findIndex(({ title: id1 }) => { return id1 === diff[0].title })].disabled = true;

            this.setState(prevState => ({ table1: [...prevState.table1, diff[0]] }));

        } else {
            const diff = arr.filter(({ avgM: id1 }) => !this.state.table2.some(({ avgM: id2 }) => id2 === id1));
            posts[posts.findIndex(({ title: id1 }) => { return id1 === diff[0].title })].disabled = true;
            this.setState({ table1: [diff[0]] });
        }
    }
    addPostT2 = () => {
        let arr = this.colculatAvgMark()
        if (this.state.table2.length > 0) {
            const results = arr.filter(({ avgM: id1 }) => !this.state.table2.some(({ avgM: id2 }) => id2 === id1));
            const diff = results.filter(({ avgM: id1 }) => !this.state.table1.some(({ avgM: id2 }) => id2 === id1));
            posts[posts.findIndex(({ title: id1 }) => { return id1 === diff[0].title })].disabled = true;

            this.setState(prevState => ({ table2: [...prevState.table2, diff[0]] }));

        } else {
            const diff = arr.filter(({ avgM: id1 }) => !this.state.table1.some(({ avgM: id2 }) => id2 === id1));
            posts[posts.findIndex(({ title: id1 }) => { return id1 === diff[0].title })].disabled = true;

            this.setState({ table2: [diff[0]] });
        }
    }
    removeT1 = (e) => {
        let arr = this.state.table1
        const results = arr.filter(({ title: val }) => val !== e)
        posts[posts.findIndex(({ title: id1 }) => { return id1 === e })].disabled = false;
        this.setState({ table1: [...results] })
    }
    removeT2 = (e) => {
        let arr = this.state.table2
        const results = arr.filter(({ title: val }) => val !== e)
        posts[posts.findIndex(({ title: id1 }) => { return id1 === e })].disabled = false;
        this.setState({ table2: [...results] })
    }
    sortedT1 = () => {
        if (this.state.increment1) {
            let arr = this.state.table1
            arr = arr.sort((a, b) => {
                return b.avgM - a.avgM
            })
            this.setState({
                table1: [...arr],
                increment1: false
            })
        } else {
            let arr = this.state.table1
            arr = arr.sort((a, b) => {
                return a.avgM - b.avgM
            })
            this.setState({
                table1: [...arr],
                increment1: true
            })
        }
    }
    sortedT2 = () => {
        if (this.state.increment2) {
            let arr = this.state.table2
            arr = arr.sort((a, b) => {
                return b.avgM - a.avgM
            })
            this.setState({
                table2: [...arr],
                increment2: false
            })
        } else {
            let arr = this.state.table2
            arr = arr.sort((a, b) => {
                return a.avgM - b.avgM
            })
            this.setState({
                table2: [...arr],
                increment2: true
            })
        }
    }

    render() {
        return <>
            <Pool posts={posts} />
            <div className='table'>
                <div className='table1'>
                    <div className='header'>
                        <h1>List1</h1>
                        <div className='buttons'>
                            <button onClick={this.sortedT1}>arrow</button>
                            <button onClick={this.addPostT1}>+</button>
                        </div>
                    </div>
                    <div >
                        {this.state.table1.map(post => {

                            return <div className='list-ele'>
                                <h3>{post.title}</h3>
                                <div className='list-ele-right'>
                                    <p>{post.avgM}</p><button onClick={() => this.removeT1(post.title)}>-</button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <div className='table2'>
                    <div className='header'>
                        <h1>List2</h1>
                        <div className='buttons'>
                            <button onClick={this.sortedT2}>arrow</button>
                            <button onClick={() => this.addPostT2(this.state.table2)}>+</button>
                        </div>
                    </div>
                    <div>
                        {this.state.table2.map(post => {
                            return <div className='list-ele'>
                                <h3>{post.title}</h3>
                                <div className='list-ele-right'>
                                    <p>{post.avgM}</p><button onClick={() => this.removeT2(post.title)}>-</button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>

        </>
    }
}

export default Container