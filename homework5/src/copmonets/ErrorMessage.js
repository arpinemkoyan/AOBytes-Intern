import React from "react";
import exValidator from "./Schema/exValidator";
import Schema from "./Schema/Schema";

// export default function ErrorMessage({ data }) {

//     const schema = new Schema(exValidator);
//     const result = schema.validate(data);
//     let error_list = [];

//     for (const key in result) {
//         !result[key].valid && Object.assign(error_list, {
//             [key]: result[key]
//         })
//     }


//     // console.log(error_list)
//     // [firstName: {… }, email: {… }, age: {… }, passport: {… }, phoneNumbers: {… }]
//     return <div>
//         {error_list.map(ele => {
//             return <p>{ele}</p>

//         })}
//     </div>
// }

class ErrorMessage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            // error: error_list
        }
    }

    getErr = () => {
        const { data } = this.props;
        const schema = new Schema(exValidator);
        const result = schema.validate(data);
        let error_list = [];

        // for (const key in result) {
        //     !result[key].valid && Object.assign(error_list, {
        //         [key]: result[key]
        //     })

        // }
        console.log(result)
        return result;
    }


    render() {
        const err = this.getErr();
        return <div>
            {/* {error_list.map(ele => {
                return <p>{ele}</p>
            })} */}
        </div>
    }
}

export default ErrorMessage