const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notes') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, notesController.getDashboard)

router.get('/add', ensureAuth, notesController.getNotes)

router.get('/index', ensureAuth, notesController.getPublicNotes)

router.get('/edit/:id', ensureAuth, notesController.getEdit)

router.post('/', ensureAuth, notesController.createNotes)

router.put('/:id', ensureAuth, notesController.updateNotes)



module.exports = router