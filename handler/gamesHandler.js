// PEGANDO INFORMAÇÕES DO JSON, E ARMAZENANDO NUMA VARIÁVEL
let gamesJSON = require('../info/info.json')
let games = gamesJSON.games

// INTANCIANDO FS
const fs = require('fs')
// INSTANCIANDO defaultResponses
const defRes = require('../defaultResponses/defResponses')

// OTHER FUNCTIONS
// CRIA A FUNÇÃO QUE PEGA AS INFORMAÇÕES DO JSON, ATUALIZANDO AS VARIAVEIS
function updateJSON() {
    gamesJSON = require('../info/info.json')
    games = gamesJSON.games
}

// CRIA A FUNÇÃO QUE RETORNA O INDEX DO JOGO DE ID = x
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


// UPDATA AS VARIAVEIS DO JSON E OS RETORNA NUMA RESPONSE
const getAllGames = (req, res) => {
    updateJSON()
    res.send(games)
}

// ACHA O JOGO DE ID IGUAL AO PARÂMETRO DA REQUISIÇÃO E O RETORNA NUMA RESPONSE
const getGameById = (req, res) => {
    updateJSON()
    const game = games.find(game => game.id == req.params.id)
    game ? res.send(game) : res.sendStatus(defRes.NOT_FOUND)
}

// CRIA UM NOVO JOGO
const createGame = (req, res) => {
    // PEGA O ID DO ULTIMO ELEMENTO E SOMA 1
    let id = games[(games.length - 1)]
    let idx = 0
    id ? idx = id.id : idx = -1
    idx+=1

    // PUSHA OS VALORES PASSADOS NO BODY DA REQUISIÇÃO, ATUALIZA O ARQUIVO JSON E AS VARIAVEIS DO JSON
    // E NO FINAL RETORNA TODOS OS JOGOS NUMA RESPONSE
    if(req.body.name){
        let newGame = gamesJSON
        newGame.games.push({
            id: idx,
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
        // SE O CAMPO NOME NÃO FOI PREENCHIDO RETORNA BAD_REQUEST
        res.sendStatus(defRes.BAD_REQUEST)
    }
}

// DELETA UM JOGO
const deleteGame = (req, res) => {
    let deleteGame = gamesJSON
    const id = parseFloat(req.params.id)
    const index = findGameById(id)

    // ACHA O INDEX DO JOGO COM ID IGUAL AO PARÂMETRO, TIRA O ELEMENTO DE INDEX IGUAL AO PARÂMETRO
    if(index || index == 0) {
        deleteGame.games.splice(index, 1)
    
        fs.writeFile('./info/info.json', JSON.stringify(deleteGame),  (err) => { 
            if(err) { console.log(err) }
        })
        updateJSON()
        res.send(games)
    }else {
        // SE NÃO ACHA O ELEMENTO RETORNA BAD_REQUEST
        res.sendStatus(defRes.BAD_REQUEST)
    }

}

// ATUALIZA O JOGO
const updateGame = (req, res) => {
    let updateGame = gamesJSON
    const id = parseFloat(req.params.id)
    const index = findGameById(id)

    // ACHA O INDEX DO ELEMENTO
    if(index) {
        // ATUALIZA O ELEMENTO DE INDEX IGUAL AO PARÂMETRO
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
        // SE NÃO ACHA O INDEX DO ELEMENTO RETORNA BAD_REQUEST
        res.sendStatus(defRes.BAD_REQUEST)
    }
}

// ACHA O JOGO COM O NOME DA PRODUTORA
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