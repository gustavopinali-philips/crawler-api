const search = require('./search')

function post(req, res, next) {
  search.post(req.body, (err, data) => {
    if (err) res.status(500).send(err)
    res.json(data)
  })
}

module.exports = {
  post
}