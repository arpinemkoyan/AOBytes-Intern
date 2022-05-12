import React from 'react'
import posts from '../data/post-comm';

class Searching extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: posts,
            searchVal: "",
        }
    }

    handleChange = (e) => {

        this.props.resetValue(e.target.value);
        this.setState({
            searchVal: e.target.value
        })
        e.preventDefault();
    }

    render() {
        return <>
            <div className='search'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type={'text'} placeholder='Search' value={this.state.searchVal} onChange={(e) => this.handleChange(e)} />
                    <button type='submit' value={'submit'} onSubmit={(e) => e.preventDefault()}>Submit</button>
                </form>

            </div >
        </>
    }
}

export default Searching