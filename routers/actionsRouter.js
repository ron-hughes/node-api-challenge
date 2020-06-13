const express = require("express");
const db = require("../data/helpers/actionModel.js");
const router = express.Router();

// GET ALL ACTIONS
router.get("/", async (req, res, next) => {
  try {
    const data = await db.get();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// POST NEW ACTION
router.post("/", async (req, res, next) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
      res.status(400).json({
          error: "Missing project id, description, or notes."
      })
  }
  else {
  try {
    const data = db.insert({
      project_id: project_id,
      description: description,
      notes: notes,
    });
    res.json(data)
  }
  catch (err) {
      next(err)
  }
}
});

// REMOVE ACTION
router.delete("/:id", async (req, res, next) => {

    try {
        await db.remove(req.params.id)
        res.status(204).end()
    }
    catch (err) {
        next(err)
    }
})

// UPDATE ACTION
router.patch("/:id", async (req, res, next) => {
    const { project_id, description, notes } = req.body;
    const { id } = req.params
    try {
        const data = db.update(id, {
            project_id: project_id,
            description: description,
            notes: notes
        })
        res.status(201).json(data)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;
