const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const collection = 'users'

const InboxSchema = new Schema({
  messages: [{
    author: {type: ObjectId, ref: 'User'},
    body: String,
    createdAt: {type: Date, default: Date.now}
  }]
})

const OutboxSchema = new Schema({
  messages: [{
    adresseer: {type: ObjectId, ref: 'User'},
    body: String,
    createdAt: {type: Date, default: Date.now}
  }]
})

const UserSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  profileImg: String,
  occupation: String,
  friends: [{type: ObjectId, ref: 'User'}],
  inbox: [ InboxSchema ],
  outbox: [ OutboxSchema ]
}, { collection })

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
