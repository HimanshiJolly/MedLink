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
  const { name, username, email, password } = req.body

  fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
    if (err) return next(err)

    let users = [];
    if (data) {
      users = JSON.parse(data)
    }
    const usernameExists = users.some(u => u.username === username)

    if (usernameExists) {
      return res.status(404).redirect('/register?error=UsernameTaken')
    }
    if (password.length < 8) {
      return res.status(400).redirect('/register?error=Length')
    }

    const newUser = { name, username, email, password }
    users.push(newUser)

    fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users, null, 2), (err) => {
      if (err) return next(err)
      req.session.user = { name: name }
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
router.post('/reset', (req, res, next) => {
  const { email, newPassword, confirmPassword } = req.body

  if (newPassword !== confirmPassword) {
      return res.status(400).redirect('/reset?error=PasswordMismatch')
  }
  if (newPassword.length < 8) {
    return res.status(400).redirect('/reset?error==Length')
  }
  fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
      if (err) return next(err)

      let users = JSON.parse(data)

      const userIndex = users.findIndex((user) => user.email === email)

      if (userIndex === -1) {
          return res.status(404).redirect('/reset?error=UserNotFound')
      }

      users[userIndex].password = newPassword

      fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users, null, 2), (err) => {
          if (err) return next(err)
          res.redirect('/login')
      })
  })
})

module.exports = router