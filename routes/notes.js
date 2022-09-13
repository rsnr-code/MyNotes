const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notes') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, notesController.getDashboard)

router.get('/add', ensureAuth, notesController.getNotes)

router.post('/', ensureAuth, notesController.createNotes)

router.put('/markComplete', notesController.markComplete)

router.put('/markIncomplete', notesController.markIncomplete)

router.delete('/deleteNotes', notesController.deleteNotes)

module.exports = router