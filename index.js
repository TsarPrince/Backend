const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3300;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// establish connection with database
require('./config/db')();

const Student = require('./models/Student');

app.post('/create', (req, res) => {
  const student = new Student(req.body);
  student.save()
    .then(() => {
      res.status(200).json({
        message: 'success',
        data: req.body
      })
    })
    .catch(err => {
      res.status(400).json({
        'message': 'failed',
        error: err.error
      })
    })
})

app.post('/update', (req, res) => {
  const filter = { _id: req.body._id };
  const update = req.body;
  const options = { new: true };
  Student.findByIdAndUpdate(filter, update, options, (err, doc) => {
    if (err) {
      res.status(400).json({
        message: 'failed',
        error: err.message
      })
    } else {
      res.status(200).json({
        message: 'success',
        data: doc
      })
    }
  })
})

app.get('/get', (req, res) => {
  const id = req.query._id;
  Student.findById(id, (err, doc) => {
    if (err) {
      res.status(400).json({
        message: 'failed',
        error: err.message
      })
    } else {
      res.status(200).json({
        message: 'success',
        data: doc
      })
    }
  })
})

app.delete('/delete', (req, res) => {
  const filter = { _id: req.body._id };
  Student.deleteOne(filter, err => {
    if (err) {
      res.status(400).json({
        message: 'failed',
        error: err.message
      })
    } else {
      res.status(200).json({
        message: 'success',
        data: 'Document deleted successfully'
      })
    }
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})