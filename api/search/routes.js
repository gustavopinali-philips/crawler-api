const express = require("express")
const searchController = require("./searchController")

function init() {
	let routes = express.Router()

	routes.route('/')
		.post(searchController.post)
	return routes
}

module.exports = { init }
