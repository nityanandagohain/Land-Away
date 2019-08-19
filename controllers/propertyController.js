const Property = require("../models/Property");
const { serverError } = require("../utils/error")
const User = require("../models/User");

module.exports = {
    create(req, res) {
        console.log(req.body);
        let { property_name, contact_email, contact_phone, price, description, tags, address } = req.body
        let userId = req.user._id;
        let property = new Property({
            property_name,
            contact_email,
            contact_phone,
            price,
            description,
            tags,
            address,
            author: userId
        });

        property.save()
            .then(property => {
                let updatedUser = {...req.user._doc };

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
        // let { _id } = req.user._doc
        console.log("in get all")
        Property.find()
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
        let { propertyID } = req.params;
        Property.finddById(propertyID)
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
        let { propertyID } = req.params;
        Property.findOneAndUpdate({ _id: propertyID }, { $set: req.body }, { new: true })
            .then(result => {
                res.status(200).json({
                    message: 'Updated Successfully',
                    transaction: result
                })
            })
            .catch(err => serverError(res, err));
    },
    remove(req, res) {
        let { propertyID } = req.params;
        console.log(propertyID)
        Property.findOneAndDelete({ _id: propertyID })
            .then(result => {
                res.status(200).json({
                    message: "Deleted Successfully",
                    ...result._doc
                })
            })
            .catch(err => serverError(res, err));
    }
}