const jwt = require("jsonwebtoken");
const registerValidator = require("../validator/registerValidator");
const loginValidator = require("../validator/loginValidator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { serverError, resourceError } = require("../utils/error");

// login controller
module.exports = {
    login(req, res) {
        // Extract Data from request
        let { email, password } = req.body;

        // validate data
        let validate = loginValidator({ email, password });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        }

        // check if the user exists
        User.findOne({ email })
            // Use populate for transaction
            .then(user => {
                if (!user) {
                    return resourceError(res, "User Not Found!");
                }

                // comapare password
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err);
                    }

                    if (!result) {
                        return resourceError(res, "Password doesn't match");
                    }

                    // Generate token and response back
                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        amount: user.amount,
                        income: user.income,
                        expense: user.expense,
                        transactions: user.transactions
                    }, 'SECRET', { expiresIn: '2h' });

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    });

                });
            })
            .catch(err => serverError(res, err));
    },
    register(req, res) {
        // read client data
        let { name, email, password, confirmPassword } = req.body;

        // validate user data
        let validate = registerValidator({ name, email, password, confirmPassword });
        if (!validate.isValid) {
            res.status(400).json(validate.error);
        }

        // check for duplicate user
        User.findOne({ email })
            .then(user => {
                if (user) {
                    return resourceError(res, "Email already exists!");
                }
                bcrypt.hash(password, 11, (err, hash) => {
                    if (err) {
                        return resourceError(res, "Server Error");
                    }

                    // New user object
                    let user = new User({
                        name,
                        email,
                        password: hash,
                        balance: 0,
                        expense: 0,
                        income: 0,
                        transactions: []
                    });

                    // Save to database
                    user.save()
                        .then(user => {
                            // response back with new data
                            res.status(201).json({
                                message: "User created successfully"
                            });
                        })
                        .catch(err => serverError(res, err))
                });
            })
            .catch(err => serverError(res, err));
    },
    allUser(req, res) {
        User.find()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => serverError(res, err));
    }
}