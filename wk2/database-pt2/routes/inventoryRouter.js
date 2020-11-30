const express = require('express')
const inventoryRouter = express.Router()
const Inventory = require('../models/Inventory')


//GET All 
inventoryRouter.get('/', (req, res, next) => {
    Inventory.find((err, inventory) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(inventory)
    })
})

//GET One
inventoryRouter.get('/:inventoryId', (req, res, next) => {
    Inventory.findById(req.params.inventoryId, (err, result) => {
        if(err)
        {
            res.status(500)
            return next(err)
        } else {
            return res.status(200).send(result)
        }
    })
})

//POST
inventoryRouter.post('/', (req, res, next) => {
    const newInventory = new Inventory(req.body)
    newInventory.save((err, savedInventory) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedInventory)
    })
})

//DELETE
inventoryRouter.delete('/:invetoryId', (req, res, next) => {
    Inventory.findOneAndDelete({ _id: req.params.inventoryId }, (err, deletedItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Item ${deletedItem} removed from database`) //deletedItem returns null in postman 
    })

})

//PUT
inventoryRouter.put('/:inventoryId', (req, res, next) => {
    Inventory.findOneAndUpdate(
        { _id: req.params.inventoryId },
        req.body,
        { new: true },
        (err, updatedInventory) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedInventory)
        }
    )
})

module.exports = inventoryRouter