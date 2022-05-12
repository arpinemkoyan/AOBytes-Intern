export default function passportValidator(value, message) {
    return value.includes('AM')
        ? {
            valid: true,
            error: null
        }
        : {
            valid: false,
            error: message ? message : "Not valid Passport number"
        }
}