const express = require('express')
const path = require('path')
const fs = require('fs')
const Doctor = require('../models/doctor')
const router = express.Router()

const user=require('../models/user')

router.post('/login', async(req, res, next) => {
  let { username, password } = req.body

  try {
    let foundUser = await user.findOne({ username, password }).exec()
    if (foundUser) {
      req.session.user = { name: foundUser.name }
      return res.redirect('/')
    } else {
      return res.redirect('/register')
    }
  } catch (err) {
    return next(err)
  }
});

router.post('/register', async(req, res, next) => {
  let { name, username, email, password } = req.body

  try {
    const usernameExists = await user.findOne({ username }).exec()
    if (usernameExists) {
      return res.status(404).redirect('/register?error=UsernameTaken')
    }
    if (password.length < 8) {
      return res.status(400).redirect('/register?error=Length')
    }

    await user.insertOne({ name, username, email, password });

    req.session.user = { name: name }
    res.redirect('/')
  } catch (err) {
    return next(err)
  }
})

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

router.get('/user', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ user: req.session.user })
  } else {
    res.json({ user: null })
  }
})
router.post('/reset', async(req, res, next) => {
  let { email, newPassword, confirmPassword } = req.body
  if (newPassword !== confirmPassword) {
    return res.redirect('/reset?error=PasswordMismatch')
  }
  if (newPassword.length < 8) {
    return res.redirect('/reset?error=Length')
  }

  try {
    let foundUser= await user.findOne({ email }).exec()
    if (!foundUser) {
      return res.redirect('/reset?error=UserNotFound')
    }
    foundUser.password = newPassword
    await foundUser.save()
    res.redirect('/login')
  } catch (err) {
    return next(err)
  }
});


router.get('/doctors', async (req, res, next) => {
  try {
    const doctors = await Doctor.find()
    res.json(doctors)
  } catch (err) {
    next(err)
  }
})
module.exports = router;
