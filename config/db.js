const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/YourGuideOrg')
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch(err => {
      console.log(err)
    })
}
