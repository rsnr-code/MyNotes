const Notes = require("../models/Notes");
const moment = require('moment')

const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('../helpers/ejs')

const express = require('express')
const app = express()
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})


module.exports = {
  getDashboard: async (req, res) => {
    console.log(req.user);
    try {
      const noteItems = await Notes.find({ user: req.user.id }).lean();
      res.render("notes", { note: noteItems, name: req.user.userName, moment: moment});
      req.app.set('layout', 'main');
    } catch (err) {
      console.log(err);
      res.render('error/500');
    }
  },

  getNotes:  (req, res) => {
      res.render('notes/add');
  },

  getPublicNotes: async (req, res) => {
    try {
      const loggedUser = req.user
      const notes = await Notes.find({ status: 'public'}).populate('user').sort({ createdAt: 'desc'}).lean();
      res.render('notes/index', {notes, user: req.user.userName, stripTags, truncate, editIcon, loggedUser})
      req.app.set('layout', 'main')
    } catch(err) {
      console.error(err)
      res.render('error/500')
    }
},

  createNotes: async (req, res) => {
    try {
      req.body.user = req.user.id
      await Notes.create(req.body)
      res.redirect('/notes')
    } catch (err) {
      console.error(err);
      res.render('error/500')
    }
  },

  getEdit: async (req, res) => {
      const notes = await Notes.findOne({
        _id: req.params.id
      }).lean()
      
      if (!notes){
        return res.render('error/404')
      }

      if(notes.user != req.user.id) {
        res.redirect('/notes')
      }else{
        res.render('notes/edit', {
          notes, select
        })
      }
    },

    updateNotes: async (req, res) => {
      let notes = await Notes.findById(req.params.id).lean()
      
      if(!notes){
        return res.render('error/404')
      }

      if(notes.user != req.user.id) {
        res.redirect('/notes')
      }else{
        notes = await Notes.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true
        })

        res.redirect('/notes')
      }
    },

    deleteNotes: async (req, res) => {
      try {
        await Notes.remove({_id: req.params.id})
        res.redirect('/notes')
      }catch(err){
        console.error(err)
        return res.render('error/500')
      }
    }

}
