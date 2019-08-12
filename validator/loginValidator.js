const validator = require("validator");

const validate = user => {
    let error = {}

    if (!user.email) {
        error.email = "Please Provide Your Email";
    } else if (!validator.isEmail(user.email)) {
        error.email = "Please Provide valid email";
    }

    if (!user.password) {
        error.password = "Pleasee provide a password";
    } else if (user.password.length < 6) {
        error.password = "Password must be more than 6 characters";
    }

    return {
        error,
        isValid: Object.keys(error).length == 0
    }
}

module.exports = validate;