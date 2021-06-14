let gamesJSON = require('../info/info.json')
let games = gamesJSON.games
const fs = require('fs')
const defRes = require('../defaultResponses/defResponses')

// const games =
// [{
//     id: 0,
//     name: "GTA V",
//     price: 20.00,
//     producer: "Rockstar Games"
// },
// {
//     id: 1,
//     name: "COD",
//     price: 50.00,
//     producer: "Ubisoft"
// },
// {
//     id: 2,
//     name: "Fifa 21",
//     price: 120.00,
//     producer: "EA"
// },
// {
//     id: 3,
//     name: "Free Fire",
//     price: 00,
//     producer: "Garena"
// }]



const getAllGames = (req, res) => {
    updateJSON()
    res.send(games)
}

const getGameById = (req, res) => {
    updateJSON()
    const game = games.find(game => game.id == req.params.id)
    game ? res.send(game) : res.sendStatus(defRes.NOT_FOUND)
}

const createGame = (req, res) => {
    let id = games[(games.length - 1)].id
    id+=1

    if(req.body.name){
        let newGame = gamesJSON
        newGame.games.push({
            id: id,
            name: req.body.name,
            price: req.body.price,
            producer: req.body.producer,
        })
        fs.writeFile('./info/info.json', JSON.stringify(newGame),  (err) => { 
            if(err) { console.log(err) }
        })
        updateJSON()
        res.send(games)
    }else {
        res.sendStatus(defRes.BAD_REQUEST)
    }
}

const deleteGame = (req, res) => {
    let deleteGame = gamesJSON
    const id = parseFloat(req.params.id)

    if(findGameById(id)) {
        deleteGame.games = deleteGame.games.filter(val => val.id !== id)
    
        fs.writeFile('./info/info.json', JSON.stringify(deleteGame),  (err) => { 
            if(err) { console.log(err) }
        })
        updateJSON()
        res.send(games)
    }else {
        res.sendStatus(defRes.BAD_REQUEST)
    }

}

const updateGame = (req, res) => {
    let updateGame = gamesJSON
    const id = parseFloat(req.params.id)
    const index = findGameById(id)

    
    if(index) {
        updateGame.games[index] = {
            id: id,
            name: req.body.name,
            price: req.body.price,
            producer: req.body.producer,
        }
        fs.writeFile('./info/info.json', JSON.stringify(updateGame),  (err) => { 
            if(err) { console.log(err) }
        })
        updateJSON()
        res.send(games)
    }else {
        res.sendStatus(defRes.BAD_REQUEST)
    }
}

const searchGameByProducer = (req, res, name) => {
    const searchView = games.filter(game => game.producer.toLowerCase().includes(name.toLowerCase()))
    res.send(searchView)
}

// OTHER FUNCTIONS


function updateJSON() {
    gamesJSON = require('../info/info.json')
    games = gamesJSON.games
}

function findGameById(id) {
    let findGame = gamesJSON

    const index = findGame.games.findIndex((val,i) => {
        if(val.id == id) {
            return true
        }
    })

    if(index > -1) {
        return index
    }
    return null
}

module.exports = {
    getAllGames,
    getGameById,
    createGame,
    deleteGame,
    updateGame,
    searchGameByProducer
}