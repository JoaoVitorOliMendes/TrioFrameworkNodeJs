const { Router } = require('express')
const express = require('express')
const gamesHandler = require('../handler/gamesHandler')
const defRes = require('../defaultResponses/defResponses')


const router = Router()
.get('/games', gamesHandler.getAllGames)
.get('/games/:id', gamesHandler.getGameById)
.post('/games', gamesHandler.createGame)
.delete('/games/:id', gamesHandler.deleteGame)
.put('/games/:id', gamesHandler.updateGame)
.patch('/games/:id')
.use('/', defRes.notFoundRes)


module.exports = router