const router = require("express").Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
	User.create({
		username: req.body.name,
		passwordhash: bcrypt.hashSync(req.body.pass, 10),
	})
		.then(function createSuccess(user) {
			let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: "1d",
			});
			res.json({
				user: user,
				message: "Workout Log Member Created!",
				sessionToken: token,
			});
		})
		.catch((err) => res.status(500).json({ error: err }));
});

router.post("/login", (req, res) => {
	User.findOne({ where: { username: req.body.name } })
		.then(function loginSuccess(user) {
			if (user) {
				bcrypt.compare(req.body.pass, user.passwordhash, function (
					err,
					matches
				) {
					if (matches) {
						let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
							expiresIn: "1d",
						});
						res.status(200).json({
							user: user,
							message: "Member Login Successful",
							sessionToken: token,
						});
					} else {
						res.status(502).send({ error: "Login Attempt Failed" });
					}
				});
			} else {
				res.status(500).json({ error: "User not found" });
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
