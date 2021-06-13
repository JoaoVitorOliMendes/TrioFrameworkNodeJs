const gamesJSON = require('../info/info.json')
const games = gamesJSON.games

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
    res.send(games)
}

const getGameById = (req, res) => {
    const game = games.find(game => game.id == req.params.id)
    res.send(game)
}

const createGame = (req, res) => {

}

const deleteGame = (req, res) => {
    
}

const updateGame = (req, res) => {
    
}

const searchGameByProducer = (req, res, name) => {
    const searchView = games.filter(game => game.producer.toLowerCase().includes(name.toLowerCase()))
    res.send(searchView)
}

module.exports = {
    getAllGames,
    getGameById,
    createGame,
    deleteGame,
    updateGame,
    searchGameByProducer
}