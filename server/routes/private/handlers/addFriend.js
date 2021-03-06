const User = require('../../../models/User.js')

function addFriend (req, res) {
  const { _id: id } = req.user
  const { _id } = req.params
  User.findByIdAndUpdate(id, {
    $addToSet: { 'friends': { _id } }
  }, { 'new': true })
  .then(user => { res.status(200).json({ user, msg: 'friend added properly!' }) })
  .catch(error => { res.status(500).json({ error, msg: 'problems adding friend' }) })
}

module.exports = addFriend
