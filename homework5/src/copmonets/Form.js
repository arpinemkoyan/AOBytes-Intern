import React from 'react'
import exValidator from './Schema/exValidator';
import Schema from './Schema/Schema';
import ErrorMessage from './ErrorMessage';

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                firstName: '',
                email: '',
                age: 0,
                passport: "",
                website: "",
                phoneNumbers: 0
            },
            errors: {},
        }
    }

    onSubmited = (e) => {
        e.preventDefault()
        // const schema = new Schema(exValidator);
        // const result = schema.validate(this.state.data);
        // let error_list = {};

        // for (const key in result) {
        //     !result[key].valid && Object.assign(error_list, {
        //         [key]: result[key]
        //     })
        // }

        // this.setState({ errors: error_list })
        // console.log(this.state.data)

        const formData = new FormData(e.target);
        console.log(formData)

    }

    setError = (error_list) => {
        return error_list
    }


    setData = (e) => {
        const value = (e.target.name === "phoneNumbers")
            ? Array.from(e.target.value)
            : (e.target.name === "age")
                ? parseInt(e.target.value)
                : e.target.value;

        this.setState(prev => ({
            data: {
                ...prev.data,
                [e.target.name]: value,
            },
        }))
    }
    onSubmitd = (e) => {
        e.preventDefault()
    }

    render() {


        return <>
            <form onSubmit={(e) => this.onSubmited(e)} >
                Fname <input type={"text"} name='firstName' value={this.state.fname} onChange={(e) => this.setData(e)} />
                Email < input type={'email'} name='email' value={this.state.email} onChange={(e) => this.setData(e)} />
                Age <input type={'number'} name='age' value={this.state.age} onChange={(e) => this.setData(e)} />
                Passport <input type={"text"} name='passport' value={this.state.passport} onChange={(e) => this.setData(e)} />
                Url <input type={"url"} name='website' value={this.state.url} onChange={(e) => this.setData(e)} />
                Phone <input type={'number'} name='phoneNumbers' value={this.state.phone} onChange={(e) => this.setData(e)} />

                {/* <ErrorMessage data={this.state.data} /> */}
                {/*<Email name='email' onChange={...} />
                <ErrorMessage errors={errors} />
                <Numeric name='age' onChange={...} />
                <ErrorMessage errors={errors} />
                <Passport name='passport' onChange={...} />
                <ErrorMessage errors={errors} />
                <Url name='website' onChange={...} />
                <ErrorMessage errors={errors} />
                <PhoneNumbers name='phoneNumbers' onChange={...} />
                <ErrorMessage errors={errors} /> */}
                <button type='submit' value={"submit"} onClick={(e) => this.onSubmited(e)}>Submit</button>
            </form >
        </>
    }
}

export default Form