const rats = require("./../controllers/rats")

module.exports = app => {
	app.get("/", rats.index)
	app.post("/upload", rats.upload)
}