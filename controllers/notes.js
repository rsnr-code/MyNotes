const Notes = require("../models/Notes");
const moment = require('moment')

const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('../helpers/ejs')

const express = require('express');
const flash = require("express-flash");
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
      req.app.set('layout', 'main');
      res.render("notes", { note: noteItems, name: req.user.userName, moment: moment}); 
    } catch (err) {
      console.log(err);
      res.render('error/500');
    }
  },

  getNotes:  (req, res) => {
    try{
      res.render('notes/add');
    }catch(err){
      console.error(err);
      res.render('error/404')
    }
  },

  getPublicNotes: async (req, res) => {
    try {
      const loggedUser = req.user
      const notes = await Notes.find({ status: 'public'}).populate('user').sort({ createdAt: 'desc'}).lean();
      req.app.set('layout', 'main');
      res.render('notes/index', {notes, user: req.user.userName, stripTags, truncate, editIcon, loggedUser});
    } catch(err) {
      console.error(err)
      res.render('error/500')
    }
},

  createNotes: async (req, res) => {
    try {
      req.body.user = req.user.id
      await Notes.create(req.body)
      const flashMessage = [];
        if (flashMessage){
          flashMessage.push({msg: 'Note created!'});
          }
        if(flashMessage.length){
          req.flash("errors", flashMessage);
          return res.redirect("../notes");
        }
      res.redirect('/notes')
    } catch (err) {
      console.error(err);
      res.render('error/500')
    }
  },

  getEdit: async (req, res) => {
    try{
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
    }catch(err){
      console.error(err)
      res.render('error/404')
    }  
    },

    updateNotes: async (req, res) => {
      try {
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
      }catch(err){
        console.error(err)
        res.render('error/500')
      }
      
    },

    deleteNotes: async (req, res) => {
      try {
        await Notes.remove({_id: req.params.id});
        const flashMessage = [];
        if (flashMessage){
          flashMessage.push({msg: 'Note deleted!'});
          }
        if(flashMessage.length){
          req.flash("errors", flashMessage);
          return res.redirect("../notes");
        }
        res.redirect('/notes')
      }catch(err){
        console.error(err)
        return res.render('error/500')
      }
    },

    getSingleNotes: async (req, res) => {
      try { 
        const loggedUser = req.user
        let notes = await Notes.findById(req.params.id)
        .populate('user')
        .lean()

      if(!notes){
        return res.render('error/404')
      }
      res.render('notes/show', {
        notes, 
        loggedUser,
        deleteMessage,
        editIcon,
        stripTags
      })
      }catch(err){
        console.error(err)
        res.render('error/404')
      }
    },

    getUserPage: async (req, res) => {
      try {
        const loggedUser = req.user
        const notes = await Notes.find({
          user: req.params.userId,
          status: 'public'
        })
        .populate('user')
        .lean()
        
        req.app.set('layout', 'main')
        res.render('notes/index', {
          notes,
          user: req.params.userId,
          editIcon,
          loggedUser,
          stripTags,
          truncate
        })

      }catch(err){
        console.error(err)
        res.render('error/404')
      }
    }
}
