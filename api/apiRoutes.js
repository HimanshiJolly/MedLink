const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

router.post('/login', (req, res, next) => {
  const { username, password } = req.body

  fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
    if (err) return next(err)

    const users = JSON.parse(data)
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      req.session.user = { name: user.name }
      return res.redirect('/')
    } else {
      return res.redirect('/register')
    }
  });
});

router.post('/register', (req, res, next) => {
  const { name,username,email, password } = req.body
  const newUser = { name,username,email, password }

  fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
    if (err) return next(err)
    let users = []
    if (data) {
      users = JSON.parse(data)
    }
    users.push(newUser)

    fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users, null, 2), (err) => {
      if (err) return next(err)
      req.session.user = {name:name}
      res.redirect('/')
    })
  })
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

module.exports = router