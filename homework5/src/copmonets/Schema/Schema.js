class Schema {
    constructor(validator) {
        this.validator = validator
    }

    min(value, min, message) {
        return value.length >= min
            ? { valid: true, error: null }
            : {
                valid: false,
                error: message ? message : `Required at least ${min} characters !!`
            };
    }

    email(value, message) {
        return (value.includes('@') && value.includes('.') && value.length >= 6)
            ? { valid: true, error: null }
            : {
                valid: false,
                error: message ? message : `Incorrect format`
            };
    }

    required(value, message) {
        return value != ''
            ? { valid: true, error: null }
            : {
                valid: false,
                error: message ? message : `Age is a required field.`
            };
    }

    max(value, max, message) {
        return value.length <= max
            ? {
                valid: true,
                error: null
            }
            : {
                valid: false,
                error: message ? message : `Maximum ${max} characters`
            }
    }

    url(value, message) {

        // return value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) !== null
        return value >= 2 ? {
            valid: true,
            error: null
        }
            : {
                valid: false,
                error: message ? message : "Not valid Url"
            }
    }

    phone(value, message) {
        let isNumber = true;
        value.length > 0 &&
            value.forEach(ele => {
                isNumber = isNumber && Number.isInteger(+ele)
            });
        return value.length === 9 && value[0] === 0 && isNumber
            ? {
                valid: true,
                error: null
            }
            : {
                valid: false,
                error: message ? message : "Not valid Phone number"
            }
    }

    validate(obj) {
        const { validator } = this;
        let validationStatus = [];

        for (let obj_name in obj) {
            console.log(obj_name)
            const checkingValidator = validator[obj_name];
            const message = checkingValidator.message;

            checkingValidator.validators.forEach(val => {
                const inputVal = obj[obj_name];
                if (typeof val === 'string') {
                    Object.assign(validationStatus, { [obj_name]: this[val](inputVal, message) })
                }

                else if (typeof val === 'object') {
                    Object.keys(val).forEach(val_name => {
                        Object.assign(validationStatus, { [obj_name]: this[val_name](inputVal, message) })
                    })
                }

                else if (typeof val === 'function') {
                    Object.assign(validationStatus, { [obj_name]: val(inputVal, message) })
                }
            })

        }

        return validationStatus

    }

}

export default Schema