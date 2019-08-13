const Transaction = require("../models/Transaction");
const { serverError } = require("../utils/error")
const User = require("../models/User");

module.exports = {
    create(req, res) {
        console.log(req.body);
        let { amount, note, type } = req.body
        let userId = req.user._id;

        let transaaction = new Transaction({
            amount,
            note,
            type,
            author: userId
        });

        transaaction.save()
            .then(trans => {
                let updatedUser = {...req.user._doc };
                if (type === 'income') {
                    updatedUser.balance = updatedUser.balance + amount;
                    updatedUser.income = updatedUser.income + amount;
                } else if (type == 'expense') {
                    updatedUser.balance = updatedUser.balance - amount;
                    updatedUser.expense = updatedUser.expense + amount;
                }
                //insert in the beginning
                console.log(updatedUser);
                updatedUser.transactions.unshift(trans._id);
                User.findByIdAndUpdate(updatedUser._id, { $set: updatedUser }, { new: true })
                    .then(result => {
                        res.status(201).json({
                            message: 'Transaction created successfully',
                            ...trans._doc,
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
        Transaction.find({ author: _id })
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
        let { transactionId } = req.params
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
        User.findByIdAndUpdate(transactionId, { $set: req.body })
            .then(result => {
                res.status(200).json({
                    message: 'Updated Successfully',
                    ...result
                })
            })
            .catch(err => serverError(res, err));
    },
    remove(req, res) {
        let { transactionId } = req.params;
        User.findByIdAndDelete(transactionId)
            .then(result => {
                res.status(200).json({
                    message: "Deleted Successfully",
                    ...result
                })
            })
            .catch(err => serverError(res, err));
    }
}