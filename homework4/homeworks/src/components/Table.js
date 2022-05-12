import React from 'react'
import TableEle from './TableEle';
import '../styles/table.css'

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table1: [],
            table2: [],
            decrement1: false,
            decrement2: false,
            color: []
        };
    }

    addPost = (tbl) => {

        this.props.addPost(tbl)

    }

    sorted = (tbl) => {

        this.props.sorted(tbl)

    }

    render() {
        const { sorted, addPost, remove, table_name, list, name } = this.props;

        return <>
            <div className='list'>
                <div className='header'>
                    <h1>{name}</h1>
                    <div className='buttons'>
                        <button onClick={() => sorted(table_name)}>sorted</button>
                        <button onClick={() => addPost(table_name)}>+</button>
                    </div>
                </div>
                <TableEle
                    list={list}
                    remove={remove}
                    table_name={table_name} />
            </div>

        </>
    }
}

export default Table
