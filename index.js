const express = require('express');

const port = process.env.PORT || 3300;
const app = express();

app.use(express.json());


// establish connection with database
require('./config/db')();

const Student = require('./models/Student');

app.post('/create', (req, res) => {
  const student = new Student(req.body);
  student.save()
    .then(() => {
      res.json({
        'message': 'success',
        'data': req.body
      })
    })
    .catch(err => {
      res.json({
        'message': err.message
      })
    })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})