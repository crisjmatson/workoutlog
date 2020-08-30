const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validate-session");
const WorkoutLog = require("../db").import("../models/log");
/* 
//log/	GET	Gets all logs for an individual user.
router.get("/", validateSession, (req, res) => {
	let owner_id = req.user.id;
	WorkoutLog.findAll({
		where: { id: owner_id },
	})
		.then((response) => res.status(200).json(response))
		.catch((err) => res.status(500).json({ error: err }));
});
//log/:id	GET	Gets individual logs by id for an individual user.
router.get("/:id", validateSession, (req, res) => {
	let id = req.params.id;

	WorkoutLog.findAll({
		where: { id: id },
	})
		.then((journals) => res.status(200).json(journals))
		.catch((err) => res.status(500).json({ error: err }));
}); */

//log/	POST	Allows users to create a workout log with descriptions, definitions, results, and owner properties.
router.post("/create", validateSession, (req, res) => {
	const logEntry = {
		description: req.body.describe,
		definition: req.body.title,
		result: req.body.finish,
		ownerid: req.user.id,
	};
	console.log(logEntry);
	WorkoutLog.create(logEntry)
		.then((workoutlog) => res.status(200).json(workoutlog))
		.catch((err) => res.status(500).json({ error: err }));
});
/* 
//log/:id	PUT	Allows individual logs to be updated by a user.
router.put("/:id", validateSession, (req, res) => {
	const updateLogEntry = {
		description: req.body.workoutlog.description,
		definition: req.body.workoutlog.definition,
		result: req.body.workoutlog.result,
	};
});

//log/:id	DELETE	Allows individual logs to be deleted by a user.
router.delete("/:id", validateSession, (req, res) => {});
 */
module.exports = router;
