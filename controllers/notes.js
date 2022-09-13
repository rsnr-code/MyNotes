const Notes = require("../models/Notes");
const moment = require('moment')

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



  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.notesIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Notes.findOneAndUpdate(
        { _id: req.body.notesIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteNotes: async (req, res) => {
    console.log(req.body.notesIdFromJSFile);
    try {
      await Notes.findOneAndDelete({ _id: req.body.notesIdFromJSFile });
      console.log("Deleted Note");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
