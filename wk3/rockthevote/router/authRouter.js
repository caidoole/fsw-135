const express = require('express');
const authRouter = express.Router();
const User = require('../models/User');

//CREATE (POST)
authRouter.post('/', (req, res, next) => {
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedUser)
    })
})

//READ ALL (GET)
authRouter.get('/', (req, res, next) => {
    User.find((err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
})

//READ ONE
authRouter.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId, (err, result) => {
        if (err) {
            res.status(500)
            return next(err)
        } else {
            return res.status(200).send(result)
        }
    })
})



//UPDATE (PUT)
authRouter.put('/:userId', (req, res, next) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true },
        (err, updatedUser) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedUser)
        }
    )
}) 

//DELETE
authRouter.delete('/:userId', (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.userId }, (err, deletedItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Item ${deletedItem} removed from database`)
        //deletedItem returns null in postman 
    })

})

module.exports = authRouter