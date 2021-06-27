const express = require("express");
const path = require("path")
const gamesRouter = require("../routes/routes")
const app = express();

const defaultRes = (req, res) => {
    res.send(
        `<h1>Home</h1>
        <br>
        <ul>
            <li><a href='http://localhost:3000/api/games'>Ver todos os jogos</a></li>
        </ul>`
    )
}


app.use(express.json());

app.use('/api', gamesRouter);


app.get('*', defaultRes);


module.exports = app;