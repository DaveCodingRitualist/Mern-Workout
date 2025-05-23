const express = require('express')
const router = express.Router()
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController.js')

// get all workouts
router.get('/', getWorkouts)

// GET a single woukout
router.get('/:id', getWorkout)

// POST a single woukout
router.post('/', createWorkout)

// DELETE a single woukout
router.delete('/:id', deleteWorkout)

// UPDATE a single woukout
router.patch('/:id', updateWorkout)

module.exports = router