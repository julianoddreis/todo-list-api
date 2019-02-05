const Note = require('../models/note.model.js')

exports.create = (req, res) => {
  if (!req.body.description) {
    return res.status(400).send({
      message: 'Note description can not be empty'
    })
  }
  const note = new Note({
    title: req.body.title,
    description: req.body.description,
    status: 'todo'
  })
  note.save()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Note.'
      })
    })
}

exports.findAll = (req, res) => {
  Note.find(req.query)
    .then(notes => {
      res.send(notes)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving notes.'
      })
    })
}

exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        })
      }
      res.send(note)
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        })
      }
      return res.status(500).send({
        message: 'Error retrieving note with id ' + req.params.noteId
      })
    })
}

exports.update = (req, res) => {
  if (!req.body.description) {
    return res.status(400).send({
      message: 'Note description can not be empty'
    })
  }

  Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  }, {new: true})
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        })
      }
      res.send(note)
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        })
      }
      return res.status(500).send({
        message: 'Error updating note with id ' + req.params.noteId
      })
    })
}

exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        })
      }
      res.send({message: 'Note deleted successfully!'})
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        })
      }
      return res.status(500).send({
        message: 'Could not delete note with id ' + req.params.noteId
      })
    })
}

exports.count = (req, res) => {
  Note.find()
    .then(notes => {
      const response = {
        todo: notes.filter(n => n.status === 'todo').length,
        done: notes.filter(n => n.status === 'done').length
      }
      res.send(response)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving notes.'
      })
    })
}
