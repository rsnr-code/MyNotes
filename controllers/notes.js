const Notes = require("../models/Notes");

module.exports = {
  getNotes: async (req, res) => {
    console.log(req.user);
    try {
      const noteItems = await Notes.find({ user: req.user.id }).lean();
      res.render("notes.ejs", { note: noteItems, name: req.user.userName });
      req.app.set('layout', 'main');
    } catch (err) {
      console.log(err);
      res.render('error/500');
    }
  },

  createNotes:  (req, res) => {
      res.render('notes/add');
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
