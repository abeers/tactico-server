const express = require('express')
// https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
// https://nodejs.org/api/crypto.html
const crypto = require('crypto')
const passport = require('passport')

const router = express.Router()

const User = require('../models/user')

// http://www.passportjs.org/packages/passport-http-bearer/
const requireToken = passport.authenticate('bearer', { session: false })

router.post('/sign-up', (req, res, next) => {
  const credentials = req.body.credentials

  Promise.resolve()
    .then(() => {
      if (
        !credentials ||
        !credentials.password ||
        credentials.password !== credentials.passwordConfirmation
      ) {
        // throw new BadParamsError()
      }
    })
    .then(() => {
      return bcrypt.hash(credentials.password, 10)
    })
    .then((hash) => {
      const user = {
        email: credentials.email,
        username: credentials.username,
        hashedPassword: hash,
      }
      return User.create(user)
    })
    .then((user) => res.status(201).json({ user: user.toObject() }))
    .catch(next)
})

router.post('/sign-in', (req, res, next) => {
  const { identifier, password } = req.body.credentials

  let user

  User.findOne({ $or: [{ email: identifier }, { username: identifier }] })
    .then((foundUser) => {
      user = foundUser
      return bcrypt.compare(password, user.hashedPassword)
    })
    .then((correctPassword) => {
      if (correctPassword) {
        // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
        const token = crypto.randomBytes(16).toString('hex')
        user.token = token
        return user.save()
      } else {
        // throw new BadCredentialsError()
      }
    })
    .then((user) => {
      res.status(201).json({ user: user.toObject() })
    })
    .catch(next)
})

router.patch('/change-password', requireToken, (req, res, next) => {
  let user

  User.findById(req.user.id)
    .then((foundUser) => {
      user = foundUser

      return bcrypt.compare(req.body.passwords.oldPassword, user.hashedPassword)
    })
    .then((correctPassword) => {
      //   if (!correctPassword || !req.body.passwords.new) {
      //     throw new BadParamsError()
      //   }
      return bcrypt.hash(req.body.passwords.newPassword, 10)
    })
    .then((hash) => {
      user.hashedPassword = hash
      return user.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/sign-out', requireToken, (req, res, next) => {
  // "invalidate" old token by setting user's token to `null`
  req.user.token = null
  req.user
    .save()
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
