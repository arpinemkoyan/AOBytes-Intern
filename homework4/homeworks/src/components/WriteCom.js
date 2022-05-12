import React from 'react'

class WriteCom extends React.Component {
    constructor() {
        super();
        this.state = {
            comVal: "",
            comRate: 0
        }
    }

    createCom = (e) => {

        e.preventDefault();

        if (this.props.child_index >= 0) {
            this.props.levelAddedCom(this.props.post_index, this.props.child_index, this.state.comVal, this.state.comRate);
            this.props.resetWriteLine(this.props.post_index, this.props.child_index);
        } else {
            this.props.addCom(this.props.post_index, this.state.comVal, this.state.comRate);
            this.props.resetWriteLine(this.props.post_index);

        }

        this.setState({
            comVal: "",
            comRate: 0
        })

    }

    render() {

        return <>
            <div className='replying'>
                <form onSubmit={(e) => this.createCom(e)}>
                    <input type={'text'} placeholder='Add a comment' value={this.state.addComVal} required onChange={(e) => this.setState({ comVal: e.target.value })} />
                    <input type={'number'} value={this.state.comRate} min={0} max={10} required onChange={(e) => { this.setState({ comRate: Number(e.target.value) }) }} />
                    <button type='submit' value={'submit'} onClick={(e) => this.createCom(e)} >Submit</button>
                </form>
            </div>
        </>
    }

}

export default WriteCom