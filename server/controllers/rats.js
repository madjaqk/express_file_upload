const path = require("path")

const mongoose = require("mongoose")
const Rat = mongoose.model("Rat")

module.exports = {
	index: (req, res) => {
		Rat.find()
			.then(rats => {
				res.render("index", {rats: rats})
			})
	},

	upload: (req, res) => {

		let new_rat = new Rat(req.body)
		if(req.files.picture){
			let file = req.files.picture
			let file_type = file.mimetype.match(/image\/(\w+)/)
			let new_file_name = ""

			if(file_type){
				let new_file_name = `${new Date().getTime()}.${file_type[1]}`
				file.mv(path.resolve(__dirname, "../../static/imgs/", new_file_name), (err, data) => {
					console.log("file move error", err)
					console.log("other file move data?", data)
				})
				new_rat.pic_url = new_file_name
			}
		}

		new_rat.save()
			.then(() => {
				res.redirect("/")
			})
			.catch(err => {
				console.log("my_rat save error", err)
				res.redirect("/")
			})
	}
}