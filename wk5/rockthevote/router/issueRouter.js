const express = require('express');
const issueRouter = express.Router();
const Issue = require('../models/Issue.js')

//Get All Issues
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, issues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

// Get Issues by userID
issueRouter.get("/user", (req, res, next) => {
    Issue.find({ userID: req.user._id }, (err, todos) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(todos)
    })
  })

issueRouter.post("/", (req, res, next) => {
    req.body.userID = req.user._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

module.exports = issueRouter