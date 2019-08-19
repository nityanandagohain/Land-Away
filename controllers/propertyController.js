const Property = require("../models/Property");
const { serverError } = require("../utils/error")
const User = require("../models/User");

module.exports = {
    create(req, res) {
        console.log(req.body);
        let { property_name, contact_email, contact_phone, price, description, tags } = req.body
        let userId = req.user._id;

        let property = new Property({
            property_name,
            contact_email,
            contact_phone,
            price,
            description,
            tags,
            author: userId
        });

        property.save()
            .then(property => {
                let updatedUser = {...req.user._doc };
                // if (type === 'income') {
                //     updatedUser.balance = updatedUser.balance + amount;
                //     updatedUser.income = updatedUser.income + amount;
                // } else if (type == 'expense') {
                //     updatedUser.balance = updatedUser.balance - amount;
                //     updatedUser.expense = updatedUser.expense + amount;
                // }

                //insert in the beginning
                console.log(updatedUser);
                updatedUser.property_owned.unshift(property._id);
                User.findByIdAndUpdate(updatedUser._id, { $set: updatedUser }, { new: true })
                    .then(result => {
                        res.status(201).json({
                            message: 'Transaction created successfully',
                            ...property._doc,
                            user: result
                        })
                    })
                    .catch(err => serverError(res, err));
            })
            .catch(error => serverError(res, error));
    },
    getAll(req, res) {
        let { _id } = req.user._doc
        console.log("in get all")
        Property.find({ author: _id })
            .then(trans => {
                if (trans.length == 0) {
                    res.status(200).json({
                        message: "No transaction found"
                    });
                } else {
                    res.status(200).json(trans);
                }
            })
            .catch(err => serverError(res, err));
    },
    getSingleTransaction(req, res) {
        let { transactionId } = req.params;
        Transaction.finddById(transactionId)
            .then(trans => {
                if (!trans) {
                    res.status(200).json({
                        message: "No Transaction Found"
                    })
                }
                res.send(200).json(trans)
            })
            .catch(err => serverError(res, err));
    },
    update(req, res) {
        let { transactionId } = req.params;
        Transaction.findOneAndUpdate({ _id: transactionId }, { $set: req.body }, { new: true })
            .then(result => {
                res.status(200).json({
                    message: 'Updated Successfully',
                    transaction: result
                })
            })
            .catch(err => serverError(res, err));
    },
    remove(req, res) {
        let { transactionId } = req.params;
        console.log(transactionId)
        Transaction.findOneAndDelete({ _id: transactionId })
            .then(result => {
                res.status(200).json({
                    message: "Deleted Successfully",
                    ...result._doc
                })
            })
            .catch(err => serverError(res, err));
    }
}