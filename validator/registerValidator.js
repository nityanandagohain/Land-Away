const validator = require("validator");

const validate = user => {
    let error = {}

    if (!user.name) {
        error.name = "Please Provide Your Name.";
    }

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

    if (!user.confirmPassword) {
        error.confirmPassword = 'Please Provide confirmation password';
    } else if (user.password != user.confirmPassword) {
        error.confirmPassword = "Password doesn\'t match";
    }

    return {
        error,
        isValid: Object.keys(error).length == 0
    }
}

module.exports = validate;