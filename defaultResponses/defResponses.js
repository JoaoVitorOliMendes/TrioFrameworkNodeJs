const NOT_FOUND = 404;
const BAD_REQUEST = 400;

const notFoundRes = (req, res) => {
    res.sendStatus(NOT_FOUND)
}

module.exports = 
{
    notFoundRes, 
    NOT_FOUND,
    BAD_REQUEST
}