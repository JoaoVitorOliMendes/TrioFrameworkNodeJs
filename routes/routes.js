const { Router } = require('express')
const express = require('express')
const gamesHandler = require('../handler/gamesHandler')

const NOT_FOUND = 404;

const notFoundRes = (req, res) => {
    res.sendStatus(NOT_FOUND)
}

const router = Router()
.get('/games', gamesHandler.getAllGames)
.get('/games/:id', gamesHandler.getGameById)
.post('/games', gamesHandler.createGame)
.delete('/games/:id', gamesHandler.deleteGame)
.put('/games/:id', gamesHandler.updateGame)
.patch('/games/:id')
.use('/', notFoundRes)


module.exports = router