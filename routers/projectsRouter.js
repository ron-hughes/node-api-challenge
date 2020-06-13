const express = require('express')
const db = require('../data/helpers/projectModel.js')
const router = express.Router();

router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        const data = await db.get(id)
        res.json(data);
    }
    catch (err) {
        next(err)
    }
})

// GET PROJECT ACTIONS
router.get("/projectactions/:id", async (req, res, next) => {
    const { id } =  req.params
    try {
        const data = await db.getProjectActions(id)
        res.json(data)
    }
    catch (err) {
        next(err)
    }
})

// POST PROJECTS
router.post("/", async (req, res, next) => {
    const { name, description } = req.body
    try {
        const data = await db.insert({
            name: name,
            description: description
        })
        res.json(data)
    }
    catch (err) {
        next(err)
    }

})

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params

    try {
        await db.remove(id)
        res.status(204).end()
    }
    catch (err) {
        next(err)
    }

})

router.patch("/:id",  async (req, res, next) => {
    const { name, description } = req.body
    const { id } = req.params

    try {
        const data = db.update(id, {
            name: name,
            description: description
        })
        res.status(201).json(data)
    }
    catch (err) {
        next(err)
    }
})


module.exports = router;