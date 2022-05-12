import React from 'react'
import posts from '../data/post-comm';
import Searching from './Searching';
import Posts from './Posts'

class Pool extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: posts,
            perPage: 2,
            currentPage: 0,
            pageCount: 10,
            disabledPrev: true,
            disabledNext: false,
            searchVal: "",
            writeLine: [
                { com: false, child: [], emoji: false },
                { com: false, child: [], emoji: false },
                { com: false, child: [], emoji: false }
            ],
        }
    }

    changePage = (e) => {

        if (e.target.value === 'prev') {
            (this.state.currentPage > 0) ? this.setState(prevState => ({
                currentPage: --prevState.currentPage,
                disabledPrev: (--prevState.currentPage > 0) ? false : true,
                disabledNext: false
            })) : this.setState({ disabledPrev: true, disabledNext: false });
        } else {
            (this.state.currentPage < this.state.pageCount) ? this.setState(prevState => ({
                currentPage: ++prevState.currentPage,
                disabledNext: (++prevState.currentPage === this.state.pageCount) ? false : true,
                disabledPrev: false
            })) : this.setState({
                disabledNext: true,
                disabledPrev: false
            });
        }

    }

    handleSearch = () => {

        const filterd_title = this.state.posts.filter(post => {
            return post.title.toLowerCase().includes(this.state.searchVal.toLowerCase())
        })
        const filter_com = this.state.posts.filter(post => {
            return (post.comments.filter(com => {
                return com.text.toLowerCase().includes(this.state.searchVal.toLowerCase())
            }).length > 0)
        })

        const filter_post = filterd_title.concat(filter_com.filter((post) => filterd_title.indexOf(post) < 0));

        return filter_post

    }

    addCom = (post_index, comm, rate) => {

        let new_posts = this.state.posts;
        new_posts[post_index].comments.push({
            text: comm,
            rate: rate,
            children: []
        })

        let reSetLine = this.state.writeLine;
        reSetLine[post_index].com = false;
        reSetLine.push({ com: false, child: [] })

        this.setState({
            posts: new_posts,
            writeLine: reSetLine,
        })

    }

    levelAddedCom = (post_index, com_index, child_com, childe_rate) => {
        let new_posts = this.state.posts;

        new_posts[post_index].comments[com_index].children.push({
            text: child_com,
            rate: childe_rate
        })

        let reSetLine = this.state.writeLine;
        reSetLine[post_index].child[com_index] = false;

        this.setState({
            posts: new_posts,
            levelComLine: reSetLine
        })

    }

    handleSearchVal = (value) => {
        this.setState({ searchVal: value })
    }

    render() {
        let items = this.handleSearch().slice((this.state.currentPage * this.state.perPage), (this.state.currentPage + 1) * this.state.perPage);
        return <>
            <Searching resetValue={this.handleSearchVal} />

            <div className='pool'>
                <Posts items={items} addCom={this.addCom} levelAddedCom={this.levelAddedCom} />

                <div>
                    <button value={"prev"} disabled={this.state.disabledPrev} onClick={(e) => this.changePage(e)}>Prev</button>
                    <button value={"next"} disabled={this.state.disabledNext} onClick={(e) => this.changePage(e)}>Next</button>
                </div>

            </div >
        </>
    }
}

export default Pool