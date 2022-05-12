import React from 'react'
import posts from '../data/post-comm';
import Pool from './Pool';
import Table from './Table';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: posts,
            table1: [],
            table2: [],
            decrement1: true,
            decrement2: true,
        };
    }

    calculateAvgMark = () => {

        let arr = []
        this.state.posts.forEach(post => {
            if (post.disabled === false) {
                let sun = 0, avgMark = 0, count = 0;
                post.comments.forEach(com => {
                    com.children.forEach(child => {
                        sun += child.rate;
                        count++;
                    })
                    sun += com.rate;
                    count++;
                })
                avgMark = sun / count;
                arr.push({ title: post.title, avgM: avgMark })
            }
        });
        arr = arr.sort((a, b) => {
            return b.avgM - a.avgM
        })

        return arr;
    }

    addPost = (tbl) => {

        let arr = this.calculateAvgMark();
        if (arr.length > 0) {
            let prev_posts = this.state.posts;
            const equal_title_name = prev_posts.findIndex(({ title: title_name }) => { return title_name === arr[0].title })
            prev_posts[equal_title_name].disabled = true;

            if (tbl === 'T1') {
                let tbl_arr = this.state.table1
                tbl_arr.push(arr[0])
                tbl_arr = this.state.decrement1
                    ? tbl_arr.sort((a, b) => b.avgM - a.avgM)
                    : tbl_arr.sort((a, b) => a.avgM - b.avgM)
                this.setState({ table1: tbl_arr, posts: prev_posts })
            }
            else if (tbl === 'T2') {
                let tbl_arr = this.state.table2
                tbl_arr.push(arr[0])
                tbl_arr = this.state.decrement2
                    ? tbl_arr.sort((a, b) => b.avgM - a.avgM)
                    : tbl_arr.sort((a, b) => a.avgM - b.avgM)
                this.setState({ table2: tbl_arr, posts: prev_posts })
            }
        }
    }

    remove = (p_title, tbl) => {

        let table_arr = (tbl === 'T1') ? this.state.table1 : this.state.table2;
        const results = table_arr.filter(({ title: val }) => val !== p_title);
        let prev_posts = this.state.posts;
        const equal_title_name = prev_posts.findIndex(({ title: title_name }) => { return title_name === p_title });
        prev_posts[equal_title_name].disabled = false;
        (tbl === 'T1')
            ? this.setState({ table1: results, posts: prev_posts })
            : this.setState({ table2: results, posts: prev_posts })

    }

    sortedTable = (tbl) => {

        let tbl_arr;
        if (tbl === 'T1') {
            tbl_arr = this.state.table1
            this.state.decrement1
                ? tbl_arr = tbl_arr.sort((a, b) => {
                    return b.avgM - a.avgM
                })
                : tbl_arr = tbl_arr.sort((a, b) => {
                    return a.avgM - b.avgM
                })

        } else {
            tbl_arr = this.state.table2
            this.state.decrement2
                ? tbl_arr = tbl_arr.sort((a, b) => {
                    return b.avgM - a.avgM
                })
                : tbl_arr = tbl_arr.sort((a, b) => {
                    return a.avgM - b.avgM
                })

        }

        return tbl_arr

    }
    sorted = (tbl) => {
        tbl === 'T1'
            ? this.setState(prevState => ({
                decrement1: !prevState.decrement1,
            }))
            : this.setState(prevState => ({
                decrement2: !prevState.decrement2,
            }))

    }

    render() {
        const list1 = this.sortedTable('T1');
        const list2 = this.sortedTable('T2');

        return <>
            <Pool />
            <div className='table'>
                <Table
                    className='table1'
                    sorted={this.sorted}
                    addPost={this.addPost}
                    remove={this.remove}
                    table_name={'T1'}
                    list={list1}
                    name={'List1'}
                />
                <Table
                    className='table2'
                    sorted={this.sorted}
                    addPost={this.addPost}
                    remove={this.remove}
                    table_name={'T2'}
                    list={list2}
                    name={'List2'}
                />
            </div>

        </>
    }
}

export default Container
