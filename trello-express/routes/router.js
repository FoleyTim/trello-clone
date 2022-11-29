const express = require('express')
const router = express.Router()
const DBService = require('../services/db.service')
const List = require('../models/list')
const dbService = new DBService(List)

//createCard
router.post('/card', async (req, res) => {
    try {
        await dbService.createCard(req.body)
        res.status(201).json()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

//moveCard
router.put('/card', async (req, res) => {
    try {
        await dbService.moveCard(req.body)
        res.status(201).json()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

//getLists (all)
router.get('/list', async (req, res) => {
    try {
        const lists = await dbService.getAllLists()
        res.json(lists)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


//createList
router.post('/list', async (req, res) => {
    console.log(req.body)
    try {
        await dbService.createList(req.body)
        res.status(201).json()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})


module.exports = router